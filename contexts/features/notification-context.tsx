"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { notificationService } from "@/lib/notification-service"

// Define notification types
export type NotificationType = "info" | "success" | "warning" | "error" | "system"

// Define notification priority levels
export type NotificationPriority = "low" | "medium" | "high" | "urgent"

// Define notification interface
export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority?: NotificationPriority
  read: boolean
  date: Date
  link?: string
  category?: string
  actions?: NotificationAction[]
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  icon?: React.ReactNode
}

// Define notification action interface
export interface NotificationAction {
  label: string
  onClick: (notification: Notification) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

// Define notification context interface
export interface NotificationContextProps {
  // Notification state
  notifications: Notification[]
  unreadCount: number
  isConnected: boolean
  connectionStatus: 'connected' | 'disconnected' | 'error' | 'initial'
  
  // Core notification actions
  addNotification: (notification: Omit<Notification, "id" | "date" | "read"> & { id?: string, date?: Date, read?: boolean }) => string
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  
  // Read status management
  markAsRead: (id: string) => void
  markAsUnread: (id: string) => void
  markAllAsRead: () => void
  
  // Notification helpers
  showSuccess: (title: string, message: string, options?: Partial<Notification>) => string
  showError: (title: string, message: string, options?: Partial<Notification>) => string
  showWarning: (title: string, message: string, options?: Partial<Notification>) => string
  showInfo: (title: string, message: string, options?: Partial<Notification>) => string
  
  // Filtering and querying
  getUnreadNotifications: () => Notification[]
  getNotificationsByType: (type: NotificationType) => Notification[]
  getNotificationsByCategory: (category: string) => Notification[]
  
  // Backend synchronization
  syncWithServer: () => Promise<void>
  connectToSSE: () => void
  disconnectFromSSE: () => void
}

// Create the notification context
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

// Create a hook to use the notification context
export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider")
  }
  return context
}

// For backward compatibility
export const useNotifications = useNotificationContext

// Define notification provider props
interface NotificationProviderProps {
  children: React.ReactNode
  maxNotifications?: number
  storageKey?: string
  persistNotifications?: boolean
  autoConnect?: boolean
}

// Create the notification provider component
export function NotificationProvider({
  children,
  maxNotifications = 50,
  storageKey = "app_notifications",
  persistNotifications = true,
  autoConnect = true,
}: NotificationProviderProps) {
  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error' | 'initial'>('initial')
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    if (persistNotifications && !isInitialized) {
      try {
        const savedNotifications = localStorage.getItem(storageKey)
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications)
          // Convert date strings back to Date objects
          const restored = parsed.map((n: any) => ({
            ...n,
            date: new Date(n.date),
          }))
          setNotifications(restored)
        }
        
        // Sync with server after loading from localStorage
        syncWithServer()
        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to load notifications from storage:", error)
      }
    }
  }, [persistNotifications, storageKey, isInitialized])
  
  // Save notifications to localStorage when they change
  useEffect(() => {
    if (persistNotifications && notifications.length > 0 && isInitialized) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(notifications))
      } catch (error) {
        console.error("Failed to save notifications to storage:", error)
      }
    }
  }, [notifications, persistNotifications, storageKey, isInitialized])
  
  // Auto-connect to SSE if enabled
  useEffect(() => {
    if (autoConnect && typeof window !== 'undefined') {
      connectToSSE()
      
      // Clean up on unmount
      return () => {
        disconnectFromSSE()
      }
    }
  }, [autoConnect])
  
  // Handle auto-closing notifications
  useEffect(() => {
    const autoCloseNotifications = notifications.filter(
      n => n.autoClose && !n.read
    )
    
    if (autoCloseNotifications.length === 0) return
    
    const timers = autoCloseNotifications.map(notification => {
      return setTimeout(() => {
        removeNotification(notification.id)
      }, notification.autoCloseDelay || 5000)
    })
    
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [notifications])
  
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length
  
  // Connect to SSE endpoint
  const connectToSSE = () => {
    // Set up listener for new notifications
    const removeListener = notificationService.addListener((notification) => {
      // Add the notification to our state
      setNotifications(prev => {
        // Check if we already have this notification
        const exists = prev.some(n => n.id === notification.id)
        if (exists) {
          // Update the existing notification
          return prev.map(n => n.id === notification.id ? notification : n)
        } else {
          // Add the new notification
          return [notification, ...prev].slice(0, maxNotifications)
        }
      })
    })
    
    // Set up listener for connection status
    const removeConnectionListener = notificationService.addConnectionListener((status) => {
      setConnectionStatus(status)
    })
    
    // Connect to the SSE endpoint
    notificationService.connect()
    
    // Return cleanup function
    return () => {
      removeListener()
      removeConnectionListener()
      notificationService.disconnect()
    }
  }
  
  // Disconnect from SSE endpoint
  const disconnectFromSSE = () => {
    notificationService.disconnect()
  }
  
  // Sync with server
  const syncWithServer = async () => {
    try {
      const serverNotifications = await notificationService.getNotifications()
      
      // Merge server notifications with local ones
      setNotifications(prev => {
        const merged = new Map<string, Notification>()
        
        // Add local notifications to map
        prev.forEach(n => merged.set(n.id, n))
        
        // Add or update server notifications
        serverNotifications.forEach(n => {
          // If we have a local version and it's newer, keep it
          const local = merged.get(n.id)
          if (local && local.date > n.date) {
            // Keep local version but update read status if server says it's read
            if (n.read && !local.read) {
              merged.set(n.id, { ...local, read: true })
            }
          } else {
            // Use server version
            merged.set(n.id, n)
          }
        })
        
        // Convert map back to array and sort by date
        return Array.from(merged.values())
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, maxNotifications)
      })
      
      return true
    } catch (error) {
      console.error("Failed to sync notifications with server:", error)
      return false
    }
  }
  
  // Add a new notification
  const addNotification = (
    notification: Omit<Notification, "id" | "date" | "read"> & { id?: string, date?: Date, read?: boolean }
  ) => {
    const id = notification.id || uuidv4()
    
    // Create the new notification
    const newNotification: Notification = {
      id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      priority: notification.priority || "medium",
      read: notification.read || false,
      date: notification.date || new Date(),
      link: notification.link,
      category: notification.category,
      actions: notification.actions,
      autoClose: notification.autoClose,
      autoCloseDelay: notification.autoCloseDelay,
      persistent: notification.persistent,
      icon: notification.icon,
    }
    
    // Add to local state
    setNotifications(prev => {
      // Add the new notification and limit the total count
      const updated = [newNotification, ...prev]
        .slice(0, maxNotifications)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
      
      return updated
    })
    
    // Send to server if it's not a temporary notification
    if (!notification.autoClose) {
      notificationService.createNotification({
        title: notification.title,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        category: notification.category,
        link: notification.link,
        autoClose: notification.autoClose,
        autoCloseDelay: notification.autoCloseDelay,
        persistent: notification.persistent,
      }).catch(error => {
        console.error("Failed to create notification on server:", error)
      })
    }
    
    return id
  }
  
  // Remove a notification
  const removeNotification = (id: string) => {
    // Remove from local state
    setNotifications(prev => prev.filter(n => n.id !== id))
    
    // Remove from server
    notificationService.deleteNotification(id).catch(error => {
      console.error(`Failed to delete notification ${id} from server:`, error)
    })
  }
  
  // Clear all notifications
  const clearAllNotifications = () => {
    // Keep persistent notifications in local state
    setNotifications(prev => prev.filter(n => n.persistent))
    
    // Clear on server
    notificationService.clearAllNotifications().catch(error => {
      console.error("Failed to clear notifications on server:", error)
    })
  }
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    // Update local state
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
    
    // Update on server
    notificationService.markAsRead(id).catch(error => {
      console.error(`Failed to mark notification ${id} as read on server:`, error)
    })
  }
  
  // Mark a notification as unread
  const markAsUnread = (id: string) => {
    // Update local state
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: false } : n))
    )
  }
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    // Update local state
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    
    // Update on server
    notificationService.markAllAsRead().catch(error => {
      console.error("Failed to mark all notifications as read on server:", error)
    })
  }
  
  // Helper to show a success notification
  const showSuccess = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({
      title,
      message,
      type: "success",
      autoClose: true,
      ...options,
    })
  }
  
  // Helper to show an error notification
  const showError = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({
      title,
      message,
      type: "error",
      priority: "high",
      ...options,
    })
  }
  
  // Helper to show a warning notification
  const showWarning = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({
      title,
      message,
      type: "warning",
      ...options,
    })
  }
  
  // Helper to show an info notification
  const showInfo = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({
      title,
      message,
      type: "info",
      autoClose: true,
      ...options,
    })
  }
  
  // Get all unread notifications
  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read)
  }
  
  // Get notifications by type
  const getNotificationsByType = (type: NotificationType) => {
    return notifications.filter(n => n.type === type)
  }
  
  // Get notifications by category
  const getNotificationsByCategory = (category: string) => {
    return notifications.filter(n => n.category === category)
  }
  
  // Create the context value
  const contextValue: NotificationContextProps = {
    notifications,
    unreadCount,
    isConnected: connectionStatus === 'connected',
    connectionStatus,
    addNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    getUnreadNotifications,
    getNotificationsByType,
    getNotificationsByCategory,
    syncWithServer,
    connectToSSE,
    disconnectFromSSE,
  }
  
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}