"use client"

import { useNotificationContext, type Notification, type NotificationType } from "@/contexts/features/notification-context"

/**
 * A simplified hook for using the notification system
 * 
 * @example
 * ```tsx
 * const notifications = useNotifications()
 * 
 * // Show a success notification
 * notifications.success("Success!", "Your operation was completed successfully")
 * 
 * // Show an error notification
 * notifications.error("Error", "Something went wrong")
 * ```
 */
export function useNotifications() {
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    notifications,
    unreadCount,
  } = useNotificationContext()

  return {
    /**
     * Show a success notification
     */
    success: (title: string, message: string, options?: Partial<Notification>) => 
      showSuccess(title, message, options),
    
    /**
     * Show an error notification
     */
    error: (title: string, message: string, options?: Partial<Notification>) => 
      showError(title, message, options),
    
    /**
     * Show a warning notification
     */
    warning: (title: string, message: string, options?: Partial<Notification>) => 
      showWarning(title, message, options),
    
    /**
     * Show an info notification
     */
    info: (title: string, message: string, options?: Partial<Notification>) => 
      showInfo(title, message, options),
    
    /**
     * Add a custom notification
     */
    add: (notification: Omit<Notification, "id" | "date" | "read"> & { id?: string, date?: Date, read?: boolean }) => 
      addNotification(notification),
    
    /**
     * Remove a notification by ID
     */
    remove: (id: string) => removeNotification(id),
    
    /**
     * Mark a notification as read
     */
    markRead: (id: string) => markAsRead(id),
    
    /**
     * Mark all notifications as read
     */
    markAllRead: () => markAllAsRead(),
    
    /**
     * Clear all notifications
     */
    clearAll: () => clearAllNotifications(),
    
    /**
     * Get all notifications
     */
    getAll: () => notifications,
    
    /**
     * Get the count of unread notifications
     */
    unreadCount,
  }
}

/**
 * A hook for showing toast-style notifications
 * 
 * @example
 * ```tsx
 * const toast = useToast()
 * 
 * // Show a success toast
 * toast.success("Operation successful!")
 * 
 * // Show an error toast with a longer duration
 * toast.error("Something went wrong", { duration: 10000 })
 * ```
 */
export function useToast() {
  const { showSuccess, showError, showWarning, showInfo } = useNotificationContext()
  
  return {
    /**
     * Show a success toast notification
     */
    success: (message: string, options?: { title?: string, duration?: number }) => 
      showSuccess(options?.title || "Success", message, {
        autoClose: true,
        autoCloseDelay: options?.duration || 3000,
      }),
    
    /**
     * Show an error toast notification
     */
    error: (message: string, options?: { title?: string, duration?: number }) => 
      showError(options?.title || "Error", message, {
        autoClose: true,
        autoCloseDelay: options?.duration || 5000,
      }),
    
    /**
     * Show a warning toast notification
     */
    warning: (message: string, options?: { title?: string, duration?: number }) => 
      showWarning(options?.title || "Warning", message, {
        autoClose: true,
        autoCloseDelay: options?.duration || 4000,
      }),
    
    /**
     * Show an info toast notification
     */
    info: (message: string, options?: { title?: string, duration?: number }) => 
      showInfo(options?.title || "Info", message, {
        autoClose: true,
        autoCloseDelay: options?.duration || 3000,
      }),
  }
}