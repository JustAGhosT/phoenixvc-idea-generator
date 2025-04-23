"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotificationContext, type NotificationType } from "@/contexts/notification-context"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, Bell, Check, CheckCircle, Info, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Notifications() {
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

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id)
    if (link) {
      router.push(link)
    }
    setOpen(false)
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 px-2 text-xs">
                <Check className="h-3.5 w-3.5 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="h-8 px-2 text-xs">
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear all
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <span className="ml-1 text-xs bg-brand-primary text-white rounded-full px-1.5">{unreadCount}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No notifications</div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/30",
                    )}
                    onClick={() => handleNotificationClick(notification.id, notification.link)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("font-medium text-sm", !notification.read && "text-brand-primary")}>
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
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 cursor-pointer hover:bg-muted/50 transition-colors bg-muted/30"
                      onClick={() => handleNotificationClick(notification.id, notification.link)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm text-brand-primary">{notification.title}</p>
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
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleNotificationClick(notification.id, notification.link)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
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
