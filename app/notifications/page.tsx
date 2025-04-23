"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotificationContext, type NotificationType } from "@/contexts/features/notification-context"
import { usePage } from "@/hooks/use-page"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  Info,
  Search,
  Trash2
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

/**
 * Notification center page component
 * Displays all notifications with filtering and search capabilities
 */
export default function NotificationCenterPage() {
  // Set page title and breadcrumb
  usePage({ title: "Notifications" })
  
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotificationContext()
  
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter notifications based on search query
  const filteredNotifications = notifications.filter(notification => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      notification.title.toLowerCase().includes(searchLower) ||
      notification.message.toLowerCase().includes(searchLower)
    )
  })
  
  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }
  
  // Handle notification click
  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id)
    if (link) {
      router.push(link)
    }
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your notifications
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
          
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllNotifications}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardHeader className="p-4 pb-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All
                <span className="ml-1 text-xs text-muted-foreground">
                  ({notifications.length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <span className="ml-1 text-xs text-muted-foreground">
                  ({unreadCount})
                </span>
              </TabsTrigger>
              <TabsTrigger value="read">
                Read
                <span className="ml-1 text-xs text-muted-foreground">
                  ({notifications.length - unreadCount})
                </span>
              </TabsTrigger>
              <TabsTrigger value="important">
                Important
                <span className="ml-1 text-xs text-muted-foreground">
                  ({notifications.filter(n => n.priority === "high" || n.priority === "urgent").length})
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery 
                      ? "Try a different search term" 
                      : "When you receive notifications, they will appear here"}
                  </p>
                </div>
              ) : (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                          !notification.read && "bg-muted/30",
                        )}
                        onClick={() => handleNotificationClick(notification.id, notification.link)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5">
                            {notification.icon || getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={cn(
                                  "font-medium",
                                  !notification.read && "text-primary",
                                  notification.priority === "urgent" && "text-red-600 dark:text-red-400"
                                )}>
                                  {notification.title}
                                  {notification.priority === "urgent" && (
                                    <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                                      Urgent
                                    </span>
                                  )}
                                  {notification.priority === "high" && (
                                    <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                      High Priority
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatDistanceToNow(notification.date, { addSuffix: true })}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notification.id)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {notification.category && (
                              <div className="mt-2">
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  {notification.category}
                                </span>
                              </div>
                            )}
                            
                            {notification.actions && notification.actions.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {notification.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    variant={action.variant || "secondary"}
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
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-4">
              {filteredNotifications.filter(n => !n.read).length === 0 ? (
                <div className="py-12 text-center">
                  <Check className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No unread notifications</h3>
                  <p className="text-muted-foreground mt-1">
                    You've read all your notifications
                  </p>
                </div>
              ) : (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredNotifications
                      .filter(n => !n.read)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors bg-muted/30"
                          onClick={() => handleNotificationClick(notification.id, notification.link)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5">
                              {notification.icon || getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className={cn(
                                    "font-medium text-primary",
                                    notification.priority === "urgent" && "text-red-600 dark:text-red-400"
                                  )}>
                                    {notification.title}
                                    {notification.priority === "urgent" && (
                                      <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                                        Urgent
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {formatDistanceToNow(notification.date, { addSuffix: true })}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeNotification(notification.id)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {notification.actions && notification.actions.length > 0 && (
                                <div className="flex gap-2 mt-3">
                                  {notification.actions.map((action, index) => (
                                    <Button
                                      key={index}
                                      variant={action.variant || "secondary"}
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
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              )}
            </TabsContent>
            
            <TabsContent value="read" className="mt-4">
              {filteredNotifications.filter(n => n.read).length === 0 ? (
                <div className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No read notifications</h3>
                  <p className="text-muted-foreground mt-1">
                    You haven't read any notifications yet
                  </p>
                </div>
              ) : (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredNotifications
                      .filter(n => n.read)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleNotificationClick(notification.id, notification.link)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5">
                              {notification.icon || getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-medium">{notification.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {formatDistanceToNow(notification.date, { addSuffix: true })}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeNotification(notification.id)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              )}
            </TabsContent>
            
            <TabsContent value="important" className="mt-4">
              {filteredNotifications.filter(n => n.priority === "high" || n.priority === "urgent").length === 0 ? (
                <div className="py-12 text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">No important notifications</h3>
                  <p className="text-muted-foreground mt-1">
                    You don't have any high priority notifications
                  </p>
                </div>
              ) : (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredNotifications
                      .filter(n => n.priority === "high" || n.priority === "urgent")
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                            !notification.read && "bg-muted/30",
                            notification.priority === "urgent" && "bg-red-50/50 dark:bg-red-950/20"
                          )}
                          onClick={() => handleNotificationClick(notification.id, notification.link)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5">
                              {notification.icon || getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className={cn(
                                    "font-medium",
                                    !notification.read && "text-primary",
                                    notification.priority === "urgent" && "text-red-600 dark:text-red-400"
                                  )}>
                                    {notification.title}
                                    {notification.priority === "urgent" && (
                                      <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                                        Urgent
                                      </span>
                                    )}
                                    {notification.priority === "high" && (
                                      <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                        High Priority
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {formatDistanceToNow(notification.date, { addSuffix: true })}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeNotification(notification.id)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {notification.actions && notification.actions.length > 0 && (
                                <div className="flex gap-2 mt-3">
                                  {notification.actions.map((action, index) => (
                                    <Button
                                      key={index}
                                      variant={action.variant || "secondary"}
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
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              )}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}