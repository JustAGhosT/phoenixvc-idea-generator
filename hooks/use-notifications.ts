"use client"

import {
  CreateNotificationOptions,
  Notification,
  NotificationCategory,
  NotificationFilterOptions,
  NotificationService,
  NotificationType
} from '@/lib/notification-service'
import React from 'react'
/**
 * A hook for using notifications in components
 * 
 * @example
 * ```tsx
 * const notifications = useNotifications()
 * 
 * // Create a notification
 * notifications.createNotification({
 *   title: "New Analysis",
 *   message: "Your document analysis is complete",
 *   type: "success",
 *   category: "analysis"
 * })
 * 
 * // Show a success notification
 * notifications.success("Success!", "Your operation was completed successfully")
 * 
 * // Show an error notification
 * notifications.error("Error", "Something went wrong")
 * ```
 */
export function useNotifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = React.useState<number>(0)
  const [connectionStatus, setConnectionStatus] = React.useState<'connected' | 'disconnected' | 'error'>('disconnected')
  const notificationService = NotificationService.getInstance()

  React.useEffect(() => {
    // Subscribe to notifications changes
    const unsubscribeNotifications = notificationService.onNotificationsChanged((updatedNotifications) => {
      setNotifications(updatedNotifications)
      setUnreadCount(updatedNotifications.filter(n => !n.read).length)
    })

    // Subscribe to connection status changes
    const unsubscribeConnection = notificationService.onConnectionStatusChanged((status) => {
      setConnectionStatus(status)
    })

    // Clean up subscriptions
    return () => {
      unsubscribeNotifications()
      unsubscribeConnection()
    }
  }, [])

  return {
    // Core data
    notifications,
    unreadCount,
    connectionStatus,
    
    // Core methods from service
    createNotification: (params: CreateNotificationOptions) => notificationService.createNotification(params),
    getNotifications: (options?: NotificationFilterOptions) => notificationService.getNotifications(options),
    getUnreadNotifications: () => notificationService.getUnreadNotifications(),
    markAsRead: (id: string) => notificationService.markAsRead(id),
    markAllAsRead: (options?: { category?: NotificationCategory, type?: NotificationType }) =>
      notificationService.markAllAsRead(options),
    deleteNotification: (id: string) => notificationService.deleteNotification(id),
    clearNotifications: () => notificationService.clearNotifications(),
    setUseServerApi: (useServerApi: boolean) => notificationService.setUseServerApi(useServerApi),
    
    // Simplified helper methods
    /**
     * Show a success notification
     */
    success: (title: string, message: string, options?: Partial<Omit<CreateNotificationOptions, 'title' | 'message' | 'type'>>) => 
      notificationService.createNotification({
        title,
        message,
        type: 'success',
        category: options?.category || 'system',
        ...options
      }),
    
    /**
     * Show an error notification
     */
    error: (title: string, message: string, options?: Partial<Omit<CreateNotificationOptions, 'title' | 'message' | 'type'>>) => 
      notificationService.createNotification({
        title,
        message,
        type: 'error',
        category: options?.category || 'system',
        ...options
      }),
    
    /**
     * Show a warning notification
     */
    warning: (title: string, message: string, options?: Partial<Omit<CreateNotificationOptions, 'title' | 'message' | 'type'>>) => 
      notificationService.createNotification({
        title,
        message,
        type: 'warning',
        category: options?.category || 'system',
        ...options
      }),
    
    /**
     * Show an info notification
     */
    info: (title: string, message: string, options?: Partial<Omit<CreateNotificationOptions, 'title' | 'message' | 'type'>>) => 
      notificationService.createNotification({
        title,
        message,
        type: 'info',
        category: options?.category || 'system',
        ...options
      }),
    
    /**
     * Get notifications by type
     */
    getByType: (type: NotificationType) => 
      notifications.filter(notification => notification.type === type),
    
    /**
     * Get notifications by category
     */
    getByCategory: (category: NotificationCategory) => 
      notifications.filter(notification => notification.category === category),
    
    /**
     * Mark a notification as unread
     */
    markAsUnread: (id: string) => {
      const notification = notifications.find(n => n.id === id)
      if (notification) {
        notification.read = false
        notification.readAt = undefined
        // Save to localStorage
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('notifications', JSON.stringify(notifications))
          } catch (error) {
            console.error('Error saving notifications to localStorage', error)
          }
        }
      }
    },
    
    /**
     * Toast-style notifications
     */
    toast: {
      /**
       * Show a success toast notification
       */
      success: (message: string, options?: Partial<Omit<CreateNotificationOptions, 'message' | 'type'>>) => 
        notificationService.createNotification({
          title: options?.title || 'Success',
          message,
          type: 'success',
          category: options?.category || 'system',
          autoClose: true,
          autoCloseDelay: 5000,
          ...options
        }),
      
      /**
       * Show an error toast notification
       */
      error: (message: string, options?: Partial<Omit<CreateNotificationOptions, 'message' | 'type'>>) => 
        notificationService.createNotification({
          title: options?.title || 'Error',
          message,
          type: 'error',
          category: options?.category || 'system',
          autoClose: true,
          autoCloseDelay: 5000,
          ...options
        }),
      
      /**
       * Show a warning toast notification
       */
      warning: (message: string, options?: Partial<Omit<CreateNotificationOptions, 'message' | 'type'>>) => 
        notificationService.createNotification({
          title: options?.title || 'Warning',
          message,
          type: 'warning',
          category: options?.category || 'system',
          autoClose: true,
          autoCloseDelay: 5000,
          ...options
        }),
      
      /**
       * Show an info toast notification
       */
      info: (message: string, options?: Partial<Omit<CreateNotificationOptions, 'message' | 'type'>>) => 
        notificationService.createNotification({
          title: options?.title || 'Info',
          message,
          type: 'info',
          category: options?.category || 'system',
          autoClose: true,
          autoCloseDelay: 5000,
          ...options
        }),
    }
  }
}

/**
 * A simplified hook for toast notifications
 * 
 * @example
 * ```tsx
 * const toast = useToast()
 * 
 * // Show a success toast
 * toast.success("Operation successful!")
 * 
 * // Show an error toast with a title
 * toast.error("Something went wrong", { title: "Operation Failed" })
 * ```
 */
export function useToast() {
  const { toast } = useNotifications()
  return toast
}
