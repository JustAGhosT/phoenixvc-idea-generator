/**
 * Enhanced notification service for handling backend communication and real-time updates
 */
import {
  CreateNotificationOptions,
  Notification,
  NotificationFilterOptions,
  NotificationResponse,
  NotificationType
} from "@/lib/notification-types"

// Define notification service class
class NotificationService {
  private eventSource: EventSource | null = null
  private listeners: Set<(notification: Notification) => void> = new Set()
  private connectionListeners: Set<(status: 'connected' | 'disconnected' | 'error') => void> = new Set()
  private isConnected: boolean = false
  private reconnectTimeout: NodeJS.Timeout | null = null
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectDelay: number = 2000 // Start with 2 seconds

  /**
   * Connect to the SSE endpoint for real-time notifications
   */
  connect() {
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
          
          // Notify listeners
          this.notifyListeners(notification)
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
   * Disconnect from the SSE endpoint
   */
  disconnect() {
    if (!this.eventSource) return
    
    this.eventSource.close()
    this.eventSource = null
    this.isConnected = false
    this.notifyConnectionListeners('disconnected')
    
    // Clear any pending reconnect
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
  }

  /**
   * Attempt to reconnect to the SSE endpoint with exponential backoff
   */
  private reconnect() {
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
      this.connect()
    }, delay)
  }

  /**
   * Add a listener for new notifications
   * @returns A function to remove the listener
   */
  addListener(callback: (notification: Notification) => void) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  /**
   * Add a listener for connection status changes
   * @returns A function to remove the listener
   */
  addConnectionListener(callback: (status: 'connected' | 'disconnected' | 'error') => void) {
    this.connectionListeners.add(callback)
    return () => this.connectionListeners.delete(callback)
  }

  /**
   * Notify all listeners of a new notification
   */
  private notifyListeners(notification: Notification) {
    this.listeners.forEach(listener => {
      try {
        listener(notification)
      } catch (error) {
        console.error('Error in notification listener:', error)
      }
    })
  }

  /**
   * Notify all connection listeners of a status change
   */
  private notifyConnectionListeners(status: 'connected' | 'disconnected' | 'error') {
    this.connectionListeners.forEach(listener => {
      try {
        listener(status)
      } catch (error) {
        console.error('Error in connection listener:', error)
      }
    })
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
      priority: apiNotification.priority as any,
      read: apiNotification.read,
      date: new Date(apiNotification.createdAt),
      readAt: apiNotification.readAt ? new Date(apiNotification.readAt) : undefined,
      link: apiNotification.link,
      category: apiNotification.category,
      autoClose: apiNotification.metadata?.autoClose,
      autoCloseDelay: apiNotification.metadata?.autoCloseDelay,
      persistent: apiNotification.metadata?.persistent,
      metadata: apiNotification.metadata,
    }
  }

  /**
   * Fetch all notifications for the current user
   */
  async getNotifications(options: NotificationFilterOptions = {}): Promise<Notification[]> {
    try {
      // Build query string
      const params = new URLSearchParams()
      if (options.limit) params.set('limit', options.limit.toString())
      if (options.read !== undefined) params.set('read', options.read.toString())
      if (options.type) params.set('type', options.type)
      if (options.category) params.set('category', options.category)
      
      const queryString = params.toString() ? `?${params.toString()}` : ''
      
      const response = await fetch(`/api/notifications${queryString}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`)
      }
      
      const data: NotificationResponse[] = await response.json()
      
      // Convert API response to client notification format
      return data.map(notification => this.mapApiNotificationToClient(notification))
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  /**
   * Fetch a single notification by ID
   */
  async getNotificationById(id: string): Promise<Notification | null> {
    try {
      const response = await fetch(`/api/notifications/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch notification: ${response.status}`)
      }
      
      const data: NotificationResponse = await response.json()
      return this.mapApiNotificationToClient(data)
    } catch (error) {
      console.error(`Error fetching notification ${id}:`, error)
      return null
    }
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT'
      })
      return response.ok
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error)
      return false
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(options: { 
    category?: string, 
    type?: NotificationType 
  } = {}): Promise<boolean> {
    try {
      // Build query string
      const params = new URLSearchParams()
      if (options.category) params.set('category', options.category)
      if (options.type) params.set('type', options.type)
      
      const queryString = params.toString() ? `?${params.toString()}` : ''
      
      const response = await fetch(`/api/notifications/read-all${queryString}`, {
        method: 'PUT'
      })
      return response.ok
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      return false
    }
  }

  /**
   * Delete a notification
   */
  async deleteNotification(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      })
      return response.ok
    } catch (error) {
      console.error(`Error deleting notification ${id}:`, error)
      return false
    }
  }

  /**
   * Create a new notification
   */
  async createNotification(notification: CreateNotificationOptions): Promise<Notification | null> {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notification)
      })
      
      if (!response.ok) {
        throw new Error(`Failed to create notification: ${response.status}`)
      }
      
      const data: NotificationResponse = await response.json()
      return this.mapApiNotificationToClient(data)
    } catch (error) {
      console.error('Error creating notification:', error)
      return null
    }
  }

  /**
   * Clear all notifications
   */
  async clearAllNotifications(): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE'
      })
      return response.ok
    } catch (error) {
      console.error('Error clearing all notifications:', error)
      return false
    }
  }

  /**
   * Get the current connection status
   */
  getConnectionStatus(): 'connected' | 'disconnected' | 'error' {
    return this.isConnected ? 'connected' : (this.reconnectAttempts > 0 ? 'error' : 'disconnected')
  }
}

// Create and export a singleton instance
export const notificationService = new NotificationService()