"use client"

import { ErrorMonitor } from "@/lib/error-monitoring"
import { notificationService } from "@/lib/notification-service"
import { Notification } from "@/lib/notification-types"
import { useCallback, useEffect, useState } from "react"

/**
 * Hook for accessing and managing the list of notifications
 * 
 * @example
 * ```tsx
 * const { 
 *   notifications, 
 *   loading, 
 *   error, 
 *   refetch, 
 *   markAllAsRead,
 *   clearAll,
 *   connectionStatus
 * } = useNotificationList()
 * 
 * return (
 *   <div>
 *     <div className="flex justify-between">
 *       <h2>Notifications {connectionStatus === 'connected' && '(Live)'}</h2>
 *       <div>
 *         <Button onClick={markAllAsRead}>Mark All Read</Button>
 *         <Button onClick={clearAll}>Clear All</Button>
 *       </div>
 *     </div>
 *     
 *     {loading && <NotificationSkeleton />}
 *     {error && <ErrorMessage error={error} />}
 *     
 *     <NotificationList items={notifications} onRefresh={refetch} />
 *   </div>
 * )
 * ```
 */
export function useNotificationList({
  limit,
  read,
  type,
  category,
  realtime = true,
  autoFetch = true
}: {
  limit?: number
  read?: boolean
  type?: Notification['type']
  category?: string
  realtime?: boolean
  autoFetch?: boolean
} = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<Error | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected')

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await notificationService.getNotifications({
        limit,
        read,
        type,
        category
      })
      setNotifications(data)
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch notifications')
      setError(error)
      
      // Report to error monitoring
      if (typeof ErrorMonitor !== 'undefined') {
        ErrorMonitor.captureException(error, { context: 'notification-list' })
      }
      
      return []
    } finally {
      setLoading(false)
    }
  }, [limit, read, type, category])

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      const success = await notificationService.markAllAsRead({ category, type })
      if (success) {
        // Update local state to mark all as read
        setNotifications(prev => prev.map(notification => ({
          ...notification,
          read: true,
          readAt: new Date()
        })))
      }
      return success
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      return false
    }
  }, [category, type])

  // Clear all notifications
  const clearAll = useCallback(async () => {
    try {
      const success = await notificationService.clearAllNotifications()
      if (success) {
        setNotifications([])
      }
      return success
    } catch (error) {
      console.error('Error clearing all notifications:', error)
      return false
    }
  }, [])

  // Set up real-time updates
  useEffect(() => {
    if (!realtime || typeof window === 'undefined') return
    
    // Connect to notification service
    notificationService.connect()
    
    // Add listener for new notifications
    const removeListener = notificationService.addListener((notification) => {
      // Check if the notification matches our filter criteria
      const matchesFilter = (
        (read === undefined || notification.read === read) &&
        (type === undefined || notification.type === type) &&
        (category === undefined || notification.category === category)
      )
      
      if (matchesFilter) {
        setNotifications(prev => {
          // Check if notification already exists
          const exists = prev.some(n => n.id === notification.id)
          if (exists) {
            // Update existing notification
            return prev.map(n => n.id === notification.id ? notification : n)
          } else {
            // Add new notification at the beginning
            return [notification, ...prev]
          }
        })
      }
    })
    
    // Add listener for connection status
    const removeConnectionListener = notificationService.addConnectionListener((status) => {
      setConnectionStatus(status)
    })
    
    // Initial fetch
    if (autoFetch) {
      fetchNotifications()
    }
    
    // Cleanup
    return () => {
      removeListener()
      removeConnectionListener()
      // Don't disconnect as other components might be using it
    }
  }, [realtime, autoFetch, fetchNotifications, read, type, category])

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
    markAllAsRead,
    clearAll,
    connectionStatus
  }
}