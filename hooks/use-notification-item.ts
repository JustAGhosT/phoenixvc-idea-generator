"use client"

import { ErrorMonitor } from "@/lib/error-monitoring"
import { notificationService, type Notification } from "@/lib/notification-service"
import { useCallback, useEffect, useState } from "react"
/**
 * Hook for accessing and managing a single notification
 * 
 * @example
 * ```tsx
 * const { 
 *   notification, 
 *   loading, 
 *   error, 
 *   refetch,
 *   markAsRead,
 *   deleteNotification
 * } = useNotificationItem(id)
 * 
 * if (loading) return <NotificationSkeleton />
 * if (error) return <ErrorMessage error={error} />
 * if (!notification) return <NotFound />
 * 
 * return (
 *   <div>
 *     <h2>{notification.title}</h2>
 *     <p>{notification.message}</p>
 *     <div>
 *       {!notification.read && <Button onClick={markAsRead}>Mark as Read</Button>}
 *       <Button onClick={deleteNotification}>Delete</Button>
 *     </div>
 *   </div>
 * )
 * ```
 */
export function useNotificationItem(id: string) {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch notification
  const fetchNotification = useCallback(async () => {
    if (!id) return null
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await notificationService.getNotificationById(id)
      setNotification(data)
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to fetch notification ${id}`)
      setError(error)
      
      // Report to error monitoring
      if (typeof ErrorMonitor !== 'undefined') {
        ErrorMonitor.captureException(error, { context: `notification-item-${id}` })
      }
      
      return null
    } finally {
      setLoading(false)
    }
  }, [id])

  // Mark as read
  const markAsRead = useCallback(async () => {
    if (!id) return false
    
    try {
      const success = await notificationService.markAsRead(id)
      if (success && notification) {
        setNotification({
          ...notification,
          read: true,
          readAt: new Date()
        })
      }
      return success
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error)
      return false
    }
  }, [id, notification])
  
  // Delete notification
  const deleteNotification = useCallback(async () => {
    if (!id) return false
    try {
      const success = await notificationService.deleteNotification(id)
      if (success) {
        setNotification(null)
      }
      return success
    } catch (error) {
      console.error(`Error deleting notification ${id}:`, error)
      return false
    }
  }, [id])

  // Fetch on mount and when ID changes
  useEffect(() => {
    if (id) {
      fetchNotification()
    }
  }, [id, fetchNotification])

  // Set up real-time updates for this specific notification
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Add listener for notification updates
    const removeListener = notificationService.addListener((updatedNotification) => {
      if (updatedNotification.id === id) {
        setNotification(updatedNotification)
      }
    })
    
    return () => {
      removeListener()
    }
  }, [id])

  return {
    notification,
    loading,
    error,
    refetch: fetchNotification,
    markAsRead,
    deleteNotification
  }
}