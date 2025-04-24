"use client"

import { v4 as uuidv4 } from 'uuid'

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationCategory = 'system' | 'analysis' | 'project' | 'security' | 'update'
export type NotificationPriority = 'low' | 'medium' | 'high'

// Notification interface
export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  category: NotificationCategory
  priority?: NotificationPriority
  read: boolean
  link?: string
  date: Date
  readAt?: Date
  userId?: string
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  metadata?: Record<string, any>
}

// API response format
export interface NotificationResponse {
  id: string
  title: string
  message: string
  type: string
  category: string
  priority: string
  read: boolean
  link?: string
  createdAt: string
  readAt?: string
  metadata?: {
    autoClose?: boolean
    autoCloseDelay?: number
    persistent?: boolean
    [key: string]: any
  }
}

// Notification creation parameters
export interface CreateNotificationOptions {
  title: string
  message: string
  type: NotificationType
  category: NotificationCategory
  priority?: NotificationPriority
  link?: string
  userId?: string
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  metadata?: Record<string, any>
}

// Notification filter options
export interface NotificationFilterOptions {
  limit?: number
  read?: boolean
  type?: NotificationType
  category?: NotificationCategory
}

// Notification event listeners
type NotificationListener = (notification: Notification) => void
type NotificationsListener = (notifications: Notification[]) => void
type ConnectionStatusListener = (status: 'connected' | 'disconnected' | 'error') => void

/**
 * Notification Service - Singleton class for managing notifications
 */
export class NotificationService {
  private static instance: NotificationService
  private notifications: Notification[] = []
  private notificationListeners: NotificationListener[] = []
  private notificationsListeners: NotificationsListener[] = []
  private connectionListeners: Set<ConnectionStatusListener> = new Set()
  private userId: string | undefined
  private isConnected: boolean = false
  private eventSource: EventSource | null = null
  private reconnectTimeout: NodeJS.Timeout | null = null
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectDelay: number = 2000 // Start with 2 seconds
  private useServerApi: boolean = false

  // Private constructor for singleton pattern
  private constructor() {}

  /**
   * Get the singleton instance of NotificationService
   */
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  /**
   * Connect to notification service with user context
   */
  public connect(userId?: string): void {
    this.userId = userId
    this.isConnected = true
    console.log('Notification service connected', { userId })
    
    // Load notifications from localStorage if available
    if (typeof window !== 'undefined') {
      try {
        const savedNotifications = localStorage.getItem('notifications')
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications)
          if (Array.isArray(parsed)) {
            this.notifications = parsed.map(n => ({
              ...n,
              date: new Date(n.date),
              readAt: n.readAt ? new Date(n.readAt) : undefined
            }))
            this.notifyNotificationsListeners()
          }
        }
      } catch (error) {
        console.error('Error loading notifications from localStorage', error)
      }
    }

    // Connect to SSE if server API is enabled
    if (this.useServerApi) {
      this.connectToSSE()
    }
  }

  /**
   * Disconnect from notification service
   */
  public disconnect(): void {
    this.isConnected = false
    console.log('Notification service disconnected')
    
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    
    // Clear any pending reconnect
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    
    this.notifyConnectionListeners('disconnected')
  }

  /**
   * Connect to Server-Sent Events endpoint
   */
  private connectToSSE(): void {
    if (typeof window === 'undefined') return // Only run on client
    if (this.eventSource) return // Already connected
    
    try {
      this.eventSource = new EventSource('/api/notifications/sse')
      
      // Handle connection open
      this.eventSource.onopen = () => {
        this.isConnected = true
        this.reconnectAttempts = 0
        this.reconnectDelay = 2000 // Reset delay
        this.notifyConnectionListeners('connected')
        console.log('Connected to notification stream')
      }
      
      // Handle messages
      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          // Skip connection messages
          if (data.type === 'connection') return
          
          // Convert to our notification format
          const notification = this.mapApiNotificationToClient(data)
          
          // Add to local notifications
          this.notifications.unshift(notification)
          
          // Notify listeners
          this.notifyNotificationListeners(notification)
          this.notifyNotificationsListeners()
        } catch (error) {
          console.error('Error processing notification event:', error)
        }
      }
      
      // Handle errors
      this.eventSource.onerror = (error) => {
        this.isConnected = false
        this.notifyConnectionListeners('error')
        console.error('Notification stream error:', error)
        
        // Close the connection
        this.eventSource?.close()
        this.eventSource = null
        
        // Attempt to reconnect
        this.reconnect()
      }
    } catch (error) {
      console.error('Error connecting to notification stream:', error)
      this.reconnect()
    }
  }

  /**
   * Attempt to reconnect to the SSE endpoint with exponential backoff
   */
  private reconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }
    
    // Check if we've exceeded max attempts
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`Failed to reconnect after ${this.maxReconnectAttempts} attempts`)
      return
    }
    
    // Increase reconnect attempts
    this.reconnectAttempts++
    
    // Use exponential backoff
    const delay = Math.min(this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1), 30000) // Max 30 seconds
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)
    
    this.reconnectTimeout = setTimeout(() => {
      this.connectToSSE()
    }, delay)
  }

  /**
   * Enable or disable server API integration
   */
  public setUseServerApi(useServerApi: boolean): void {
    this.useServerApi = useServerApi
    
    if (useServerApi && this.isConnected && !this.eventSource) {
      this.connectToSSE()
    } else if (!useServerApi && this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  /**
   * Create a new notification
   */
  public async createNotification(params: CreateNotificationOptions): Promise<Notification> {
    const notification: Notification = {
      id: uuidv4(),
      title: params.title,
      message: params.message,
      type: params.type,
      category: params.category,
      priority: params.priority || 'medium',
      read: false,
      link: params.link,
      date: new Date(),
      userId: params.userId || this.userId,
      autoClose: params.autoClose,
      autoCloseDelay: params.autoCloseDelay,
      persistent: params.persistent,
      metadata: params.metadata
    }

    // Add to local notifications
    this.notifications.unshift(notification)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notifications', JSON.stringify(this.notifications))
      } catch (error) {
        console.error('Error saving notifications to localStorage', error)
      }
    }

    // If server API is enabled, create notification on server
    if (this.useServerApi) {
      try {
        const response = await fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
        
        if (response.ok) {
          const data: NotificationResponse = await response.json()
          const serverNotification = this.mapApiNotificationToClient(data)
          
          // Update local notification with server data
          notification.id = serverNotification.id
        }
      } catch (error) {
        console.error('Error creating notification on server:', error)
      }
    }

    // Notify listeners
    this.notifyNotificationListeners(notification)
    this.notifyNotificationsListeners()

    return notification
  }

  /**
   * Get all notifications
   */
  public async getNotifications(options: NotificationFilterOptions = {}): Promise<Notification[]> {
    // If server API is enabled, fetch from server
    if (this.useServerApi) {
      try {
        // Build query string
        const params = new URLSearchParams()
        if (options.limit) params.set('limit', options.limit.toString())
        if (options.read !== undefined) params.set('read', options.read.toString())
        if (options.type) params.set('type', options.type)
        if (options.category) params.set('category', options.category)
        const queryString = params.toString() ? `?${params.toString()}` : ''
        
        const response = await fetch(`/api/notifications${queryString}`)
        
        if (response.ok) {
          const data: NotificationResponse[] = await response.json()
          
          // Convert API response to client notification format
          this.notifications = data.map(notification => this.mapApiNotificationToClient(notification))
          
          // Save to localStorage
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('notifications', JSON.stringify(this.notifications))
            } catch (error) {
              console.error('Error saving notifications to localStorage', error)
            }
          }
          
          this.notifyNotificationsListeners()
        }
      } catch (error) {
        console.error('Error fetching notifications from server:', error)
      }
    }
    
    // Filter local notifications
    let filteredNotifications = [...this.notifications]
    
    if (options.read !== undefined) {
      filteredNotifications = filteredNotifications.filter(n => n.read === options.read)
    }
    
    if (options.type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === options.type)
    }
    
    if (options.category) {
      filteredNotifications = filteredNotifications.filter(n => n.category === options.category)
    }
    
    if (options.limit) {
      filteredNotifications = filteredNotifications.slice(0, options.limit)
    }
    
    return filteredNotifications
  }

  /**
   * Get unread notifications
   */
  public getUnreadNotifications(): Notification[] {
    return this.notifications.filter(n => !n.read)
  }

  /**
   * Mark a notification as read
   */
  public async markAsRead(id: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === id)
    
    if (notification) {
      notification.read = true
      notification.readAt = new Date()
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('notifications', JSON.stringify(this.notifications))
        } catch (error) {
          console.error('Error saving notifications to localStorage', error)
        }
      }
      
      // If server API is enabled, mark as read on server
      if (this.useServerApi) {
        try {
          await fetch(`/api/notifications/${id}/read`, {
            method: 'PUT'
          })
        } catch (error) {
          console.error(`Error marking notification ${id} as read on server:`, error)
        }
      }
      
      this.notifyNotificationsListeners()
    }
  }

  /**
   * Mark all notifications as read
   */
  public async markAllAsRead(options: {
    category?: NotificationCategory,
    type?: NotificationType
  } = {}): Promise<void> {
    // Filter notifications based on options
    let notificationsToMark = this.notifications
    
    if (options.category) {
      notificationsToMark = notificationsToMark.filter(n => n.category === options.category)
    }
    
    if (options.type) {
      notificationsToMark = notificationsToMark.filter(n => n.type === options.type)
    }
    
    // Mark notifications as read
    const now = new Date()
    notificationsToMark.forEach(n => {
      n.read = true
      n.readAt = now
    })
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notifications', JSON.stringify(this.notifications))
      } catch (error) {
        console.error('Error saving notifications to localStorage', error)
      }
    }
    
    // If server API is enabled, mark all as read on server
    if (this.useServerApi) {
      try {
        // Build query string
        const params = new URLSearchParams()
        if (options.category) params.set('category', options.category)
        if (options.type) params.set('type', options.type)
        const queryString = params.toString() ? `?${params.toString()}` : ''
        
        await fetch(`/api/notifications/read-all${queryString}`, {
          method: 'PUT'
        })
      } catch (error) {
        console.error('Error marking all notifications as read on server:', error)
      }
    }
    
    this.notifyNotificationsListeners()
  }

  /**
   * Delete a notification
   */
  public async deleteNotification(id: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== id)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notifications', JSON.stringify(this.notifications))
      } catch (error) {
        console.error('Error saving notifications to localStorage', error)
      }
    }
    
    // If server API is enabled, delete on server
    if (this.useServerApi) {
      try {
        await fetch(`/api/notifications/${id}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.error(`Error deleting notification ${id} on server:`, error)
      }
    }
    
    this.notifyNotificationsListeners()
  }

  /**
   * Clear all notifications
   */
  public async clearNotifications(): Promise<void> {
    this.notifications = []
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notifications', JSON.stringify([]))
      } catch (error) {
        console.error('Error saving notifications to localStorage', error)
      }
    }
    
    // If server API is enabled, clear all on server
    if (this.useServerApi) {
      try {
        await fetch('/api/notifications', {
          method: 'DELETE'
        })
      } catch (error) {
        console.error('Error clearing all notifications on server:', error)
      }
    }
    
    this.notifyNotificationsListeners()
  }

  /**
   * Subscribe to individual notification events
   */
  public onNotification(listener: NotificationListener): () => void {
    this.notificationListeners.push(listener)
    return () => {
      this.notificationListeners = this.notificationListeners.filter(l => l !== listener)
    }
  }

  /**
   * Subscribe to notifications list updates
   */
  public onNotificationsChanged(listener: NotificationsListener): () => void {
    this.notificationsListeners.push(listener)
    // Initial notification
    listener([...this.notifications])
    return () => {
      this.notificationsListeners = this.notificationsListeners.filter(l => l !== listener)
    }
  }

  /**
   * Subscribe to connection status changes
   */
  public onConnectionStatusChanged(listener: ConnectionStatusListener): () => void {
    this.connectionListeners.add(listener)
    // Initial notification
    listener(this.getConnectionStatus())
    return () => {
      this.connectionListeners.delete(listener)
    }
  }

  /**
   * Get the current connection status
   */
  public getConnectionStatus(): 'connected' | 'disconnected' | 'error' {
    return this.isConnected ? 'connected' : (this.reconnectAttempts > 0 ? 'error' : 'disconnected')
  }

  /**
   * Map API notification to client notification format
   */
  private mapApiNotificationToClient(apiNotification: NotificationResponse): Notification {
    return {
      id: apiNotification.id,
      title: apiNotification.title,
      message: apiNotification.message,
      type: apiNotification.type as NotificationType,
      category: apiNotification.category as NotificationCategory,
      priority: apiNotification.priority as NotificationPriority,
      read: apiNotification.read,
      date: new Date(apiNotification.createdAt),
      readAt: apiNotification.readAt ? new Date(apiNotification.readAt) : undefined,
      link: apiNotification.link,
      autoClose: apiNotification.metadata?.autoClose,
      autoCloseDelay: apiNotification.metadata?.autoCloseDelay,
      persistent: apiNotification.metadata?.persistent,
      metadata: apiNotification.metadata,
    }
  }

  /**
   * Notify all notification listeners
   */
  private notifyNotificationListeners(notification: Notification): void {
    this.notificationListeners.forEach(listener => {
      try {
        listener(notification)
      } catch (error) {
        console.error('Error in notification listener', error)
      }
    })
  }

  /**
   * Notify all notifications list listeners
   */
  private notifyNotificationsListeners(): void {
    const notifications = [...this.notifications]
    this.notificationsListeners.forEach(listener => {
      try {
        listener(notifications)
      } catch (error) {
        console.error('Error in notifications listener', error)
      }
    })
  }

  /**
   * Notify all connection status listeners
   */
  private notifyConnectionListeners(status: 'connected' | 'disconnected' | 'error'): void {
    this.connectionListeners.forEach(listener => {
      try {
        listener(status)
      } catch (error) {
        console.error('Error in connection listener', error)
      }
    })
  }
}