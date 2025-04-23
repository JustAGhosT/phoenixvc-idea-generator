"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotificationContext } from "@/contexts/features/notification-context"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  Info,
  Trash2,
  X
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export interface NotificationsProps {
  /**
   * Maximum number of notifications to display in the dropdown
   * @default 10
   */
  maxDisplayed?: number
  
  /**
   * Whether to show the notification count badge
   * @default true
   */
  showBadge?: boolean
  
  /**
   * Whether to show the "Mark all as read" button
   * @default true
   */
  showMarkAllRead?: boolean
  
  /**
   * Whether to show the "Clear all" button
   * @default true
   */
  showClearAll?: boolean
  
  /**
   * Whether to animate the bell when there are unread notifications
   * @default true
   */
  animateBell?: boolean
  
  /**
   * Custom class name for the notification bell button
   */
  className?: string
}

/**
 * Notification bell component with dropdown
 * 
 * @example
 * ```tsx
 * <Notifications />
 * 
 * // With custom options
 * <Notifications 
 *   maxDisplayed={5} 
 *   showBadge={false} 
 *   animateBell={false} 
 * />
 * ```
 */
export function Notifications({
  maxDisplayed = 10,
  showBadge = true,
  showMarkAllRead = true,
  showClearAll = true,
  animateBell = true,
  className,
}: NotificationsProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotificationContext()
  
  const [open, setOpen] = useState(false)
  const router = useRouter()
  
  // Handle notification click
  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id)
    if (link) {
      router.push(link)
      setOpen(false)
    }
  }
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "system":
        return <Bell className="h-4 w-4 text-purple-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }
  
  // Handle clear all notifications
  const handleClearAll = () => {
    clearAllNotifications()
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "relative",
            animateBell && unreadCount > 0 && "animate-subtle-bounce",
            className
          )}
          aria-label={`Notifications (${unreadCount} unread)`}
        >
          <Bell className="h-5 w-5" />
          {showBadge && unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] flex items-center justify-center px-1 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-1">
            {showMarkAllRead && unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-8 px-2 text-xs">
                <Check className="h-3.5 w-3.5 mr-1" />
                Mark all read
              </Button>
            )}
            
            {showClearAll && notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-8 px-2 text-xs">
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-10 rounded-none">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No notifications</div>
            ) : (
              <div className="divide-y">
                {notifications.slice(0, maxDisplayed).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/30",
                    )}
                    onClick={() => handleNotificationClick(notification.id, notification.link)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {notification.icon || getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("font-medium text-sm", !notification.read && "text-primary")}>
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.date, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {notifications.length > maxDisplayed && (
                  <div className="p-3 text-center">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => {
                        router.push('/notifications')
                        setOpen(false)
                      }}
                    >
                      View all notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="max-h-[300px] overflow-y-auto">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No unread notifications</div>
            ) : (
              <div className="divide-y">
                {notifications
                  .filter((n) => !n.read)
                  .slice(0, maxDisplayed)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 cursor-pointer hover:bg-muted/50 transition-colors bg-muted/30"
                      onClick={() => handleNotificationClick(notification.id, notification.link)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {notification.icon || getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm text-primary">{notification.title}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.date, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="read" className="max-h-[300px] overflow-y-auto">
            {notifications.filter((n) => n.read).length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No read notifications</div>
            ) : (
              <div className="divide-y">
                {notifications
                  .filter((n) => n.read)
                  .slice(0, maxDisplayed)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleNotificationClick(notification.id, notification.link)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {notification.icon || getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.date, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}