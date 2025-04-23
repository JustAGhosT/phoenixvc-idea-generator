"use client"

import { useNotificationContext } from "@/contexts/features/notification-context"
import { Notification, NotificationType, ToastOptions } from "@/lib/notification-types"

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
 * 
 * // Show a toast notification
 * notifications.toast.info("This is a toast message")
 * ```
 */
export function useNotifications() {
  const context = useNotificationContext()

  return {
    /**
     * Show a success notification
     */
    success: (title: string, message: string, options?: Partial<Notification>) => 
      context.showSuccess(title, message, options),
    
    /**
     * Show an error notification
     */
    error: (title: string, message: string, options?: Partial<Notification>) => 
      context.showError(title, message, options),
    
    /**
     * Show a warning notification
     */
    warning: (title: string, message: string, options?: Partial<Notification>) => 
      context.showWarning(title, message, options),
    
    /**
     * Show an info notification
     */
    info: (title: string, message: string, options?: Partial<Notification>) => 
      context.showInfo(title, message, options),
    
    /**
     * Add a custom notification
     */
    add: (notification: Omit<Notification, "id" | "date" | "read"> & { id?: string, date?: Date, read?: boolean }) => 
      context.addNotification(notification),
    
    /**
     * Remove a notification by ID
     */
    remove: (id: string) => context.removeNotification(id),
    
    /**
     * Mark a notification as read
     */
    markRead: (id: string) => context.markAsRead(id),
    
    /**
     * Mark a notification as unread
     */
    markUnread: (id: string) => context.markAsUnread(id),
    
    /**
     * Mark all notifications as read
     */
    markAllRead: () => context.markAllAsRead(),
    
    /**
     * Clear all notifications
     */
    clearAll: () => context.clearAllNotifications(),
    
    /**
     * Get all notifications
     */
    getAll: () => context.notifications,
    
    /**
     * Get unread notifications
     */
    getUnread: () => context.getUnreadNotifications(),
    
    /**
     * Get notifications by type
     */
    getByType: (type: NotificationType) => context.getNotificationsByType(type),
    
    /**
     * Get notifications by category
     */
    getByCategory: (category: string) => context.getNotificationsByCategory(category),
    
    /**
     * Get the count of unread notifications
     */
    unreadCount: context.unreadCount,
    
    /**
     * Check if connected to the notification server
     */
    isConnected: context.isConnected,
    
    /**
     * Get the connection status
     */
    connectionStatus: context.connectionStatus,
    
    /**
     * Toast notification helpers
     */
    toast: {
      /**
       * Show a success toast notification
       */
      success: (message: string, options?: ToastOptions) => 
        context.toast.success(message, options),
      
      /**
       * Show an error toast notification
       */
      error: (message: string, options?: ToastOptions) => 
        context.toast.error(message, options),
      
      /**
       * Show a warning toast notification
       */
      warning: (message: string, options?: ToastOptions) => 
        context.toast.warning(message, options),
      
      /**
       * Show an info toast notification
       */
      info: (message: string, options?: ToastOptions) => 
        context.toast.info(message, options),
    }
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
  const { toast } = useNotificationContext()
  return toast
}