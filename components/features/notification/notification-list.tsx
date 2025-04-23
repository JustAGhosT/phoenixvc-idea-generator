"use client"

import { useState } from "react"
import { Notification } from "@/lib/notification-types"
import { NotificationItem } from "./notification-item"
import { Button } from "@/components/ui/button"
import { CheckCheck, Trash2, RefreshCw, Bell, BellOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useNotificationList } from "@/hooks/use-notification-list"

interface NotificationListProps {
  notifications?: Notification[]
  loading?: boolean
  error?: Error | null
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  onDelete?: (id: string) => void
  onClearAll?: () => void
  onRefresh?: () => void
  onNotificationClick?: (notification: Notification) => void
  emptyMessage?: string
  className?: string
  showControls?: boolean
  showConnectionStatus?: boolean
  maxHeight?: string | number
  filter?: {
    read?: boolean
    type?: Notification['type']
    category?: string
  }
}

export function NotificationList({
  notifications,
  loading,
  error,
  onMarkRead,
  onMarkAllRead,
  onDelete,
  onClearAll,
  onRefresh,
  onNotificationClick,
  emptyMessage = "No notifications",
  className,
  showControls = true,
  showConnectionStatus = true,
  maxHeight = "400px",
  filter,
}: NotificationListProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all')
  
  // If no notifications are provided, use the hook to fetch them
  const {
    notifications: hookNotifications,
    loading: hookLoading,
    error: hookError,
    refetch,
    markAllAsRead,
    clearAll,
    connectionStatus
  } = useNotificationList({
    read: filter?.read,
    type: filter?.type,
    category: filter?.category,
    realtime: true,
    autoFetch: !notifications // Only fetch if no notifications are provided
  })

  // Use provided props or hook values
  const items = notifications || hookNotifications
  const isLoading = loading !== undefined ? loading : hookLoading
  const hasError = error || hookError
  
  // Filter notifications based on activeFilter
  const filteredNotifications = activeFilter === 'unread'
    ? items.filter(notification => !notification.read)
    : items

  // Handle actions
  const handleMarkRead = (id: string) => {
    if (onMarkRead) {
      onMarkRead(id)
    } else if (markAllAsRead) {
      // If no explicit handler but we have the hook function
      const notification = items.find(n => n.id === id)
      if (notification && !notification.read) {
        markAllAsRead()
      }
    }
  }

  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead()
    } else if (markAllAsRead) {
      markAllAsRead()
    }
  }

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll()
    } else if (clearAll) {
      clearAll()
    }
  }

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
    } else if (refetch) {
      refetch()
    }
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Controls */}
      {showControls && (
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <Button 
              variant={activeFilter === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('all')}
              className="text-xs h-8"
            >
              <Bell className="h-3.5 w-3.5 mr-1" />
              All
            </Button>
            <Button 
              variant={activeFilter === 'unread' ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter('unread')}
              className="text-xs h-8"
            >
              <BellOff className="h-3.5 w-3.5 mr-1" />
              Unread
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-8 w-8 p-0"
              title="Refresh"
            >
              <RefreshCw className={cn(
                "h-4 w-4",
                isLoading && "animate-spin"
              )} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="h-8 w-8 p-0"
              title="Mark all as read"
            >
              <CheckCheck className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-8 w-8 p-0"
              title="Clear all"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Connection status */}
      {showConnectionStatus && connectionStatus && (
        <div className="mb-2 flex items-center text-xs">
          <div className={cn(
            "w-2 h-2 rounded-full mr-2",
            connectionStatus === 'connected' ? "bg-green-500" : 
            connectionStatus === 'error' ? "bg-red-500" : "bg-gray-500"
          )} />
          <span className="text-gray-500">
            {connectionStatus === 'connected' ? "Connected" : 
             connectionStatus === 'error' ? "Connection error" : "Disconnected"}
          </span>
        </div>
      )}
      
      {/* Error message */}
      {hasError && (
        <div className="p-4 mb-3 bg-red-50 text-red-700 rounded-lg border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          <p className="text-sm">Error loading notifications: {(error || hookError)?.message}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start p-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <Skeleton className="h-6 w-6 rounded-full mr-3" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Notification list */}
      {!isLoading && (
        <div 
          className={cn(
            "space-y-2 overflow-y-auto",
            typeof maxHeight === 'number' ? `max-h-[${maxHeight}px]` : `max-h-[${maxHeight}]`
          )}
        >
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>{emptyMessage}</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
                onDelete={onDelete}
                onClick={onNotificationClick}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}