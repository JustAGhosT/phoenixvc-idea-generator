"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useNotificationItem } from "@/hooks/use-notification-item"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { AlertCircle, Bell, CheckCircle, Info, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface NotificationDialogProps {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkRead?: () => void
  onDelete?: () => void
}

export function NotificationDialog({
  id,
  open,
  onOpenChange,
  onMarkRead,
  onDelete,
}: NotificationDialogProps) {
  const { notification, loading, error, markAsRead, deleteNotification } = useNotificationItem(id)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMarkingRead, setIsMarkingRead] = useState(false)

  // Mark as read when opened
  useEffect(() => {
    if (open && notification && !notification.read) {
      markAsRead()
      if (onMarkRead) onMarkRead()
    }
  }, [open, notification, markAsRead, onMarkRead])

  // Handle delete
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteNotification()
      if (onDelete) onDelete()
      onOpenChange(false)
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle mark as read
  const handleMarkRead = async () => {
    if (!notification || notification.read) return
    
    setIsMarkingRead(true)
    try {
      await markAsRead()
      if (onMarkRead) onMarkRead()
    } finally {
      setIsMarkingRead(false)
    }
  }

  // Get icon based on notification type
  const getIcon = () => {
    if (!notification) return <Bell className="h-6 w-6 text-gray-500" />
    
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-amber-500" />
      case 'info':
        return <Info className="h-6 w-6 text-blue-500" />
      case 'system':
        return <Bell className="h-6 w-6 text-purple-500" />
      default:
        return <Bell className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {loading ? (
              <>
                <Skeleton className="h-6 w-6 mr-2 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </>
            ) : error ? (
              <>
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                Error Loading Notification
              </>
            ) : (
              <>
                <span className="mr-2">{getIcon()}</span>
                {notification?.title || "Notification"}
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-2 py-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : error ? (
          <div className="py-4 text-red-500">
            Failed to load notification: {error.message}
          </div>
        ) : notification ? (
          <div className="py-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {notification.message}
            </p>
            
            {notification.category && (
              <div className="mt-4 flex items-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2">
                  Category:
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  {notification.category}
                </span>
              </div>
            )}
            
            <div className="mt-4 flex flex-col space-y-1">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium mr-2">Received:</span>
                <span>
                  {formatDistanceToNow(notification.date, { addSuffix: true })}
                  {' '}
                  ({format(notification.date, 'PPpp')})
                </span>
              </div>
              
              {notification.readAt && (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium mr-2">Read:</span>
                  <span>
                    {formatDistanceToNow(notification.readAt, { addSuffix: true })}
                    {' '}
                    ({format(notification.readAt, 'PPpp')})
                  </span>
                </div>
              )}
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium mr-2">Priority:</span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs",
                  notification.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                  notification.priority === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                )}>
                  {notification.priority || "normal"}
                </span>
              </div>
            </div>
            
            {notification.link && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    window.location.href = notification.link!
                    onOpenChange(false)
                  }}
                >
                  Open Link
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-gray-500 dark:text-gray-400">
            Notification not found
          </div>
        )}

        <DialogFooter className="flex sm:justify-between">
          <div className="flex space-x-2">
            {notification && !notification.read && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkRead}
                disabled={isMarkingRead}
              >
                {isMarkingRead && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Mark as Read
              </Button>
            )}
            
            {notification && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </Button>
            )}
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}