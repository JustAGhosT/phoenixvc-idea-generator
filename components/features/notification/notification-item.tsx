"use client"

import { Button } from "@/components/ui/button"
import { Notification } from "@/lib/notification-types"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { AlertCircle, Bell, Check, CheckCircle, Info, X } from "lucide-react"
import { useState } from "react"

interface NotificationItemProps {
  notification: Notification
  onMarkRead?: (id: string) => void
  onDelete?: (id: string) => void
  onClick?: (notification: Notification) => void
  className?: string
}

export function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
  onClick,
  className,
}: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Format the date
  const formattedDate = notification.date 
    ? formatDistanceToNow(notification.date, { addSuffix: true })
    : ''
  
  // Get the appropriate icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      case 'system':
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }
  
  // Get the appropriate background color based on notification type and read status
  const getBackgroundColor = () => {
    if (notification.read) return "bg-gray-50 dark:bg-gray-800"
    
    switch (notification.type) {
      case 'success':
        return "bg-green-50 dark:bg-green-900/20"
      case 'error':
        return "bg-red-50 dark:bg-red-900/20"
      case 'warning':
        return "bg-amber-50 dark:bg-amber-900/20"
      case 'info':
        return "bg-blue-50 dark:bg-blue-900/20"
      case 'system':
        return "bg-purple-50 dark:bg-purple-900/20"
      default:
        return "bg-white dark:bg-gray-700"
    }
  }
  
  // Handle click on the notification
  const handleClick = () => {
    if (onClick) {
      onClick(notification)
    } else if (notification.link) {
      window.location.href = notification.link
    }
    
    // Mark as read if not already read
    if (!notification.read && onMarkRead) {
      onMarkRead(notification.id)
    }
  }
  
  return (
    <div
      className={cn(
        "relative flex items-start p-4 mb-2 rounded-lg transition-all duration-200",
        getBackgroundColor(),
        notification.read ? "opacity-80" : "opacity-100",
        notification.link || onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute top-4 left-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
      )}
      
      {/* Notification icon */}
      <div className="mr-3 mt-0.5">
        {notification.icon || getIcon()}
      </div>
      
      {/* Notification content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={cn(
            "text-sm font-medium",
            notification.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"
          )}>
            {notification.title}
          </h4>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
        
        <p className={cn(
          "text-sm mt-1",
          notification.read ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-200"
        )}>
          {notification.message}
        </p>
        
        {/* Actions */}
        {notification.actions && notification.actions.length > 0 && (
          <div className="flex mt-2 space-x-2">
            {notification.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick(notification)
                }}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* Action buttons that appear on hover */}
      {isHovered && (
        <div className="flex items-center space-x-1 ml-2">
          {!notification.read && onMarkRead && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation()
                onMarkRead(notification.id)
              }}
              title="Mark as read"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-500 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(notification.id)
              }}
              title="Delete notification"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}