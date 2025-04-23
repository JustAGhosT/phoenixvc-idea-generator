"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotificationContext } from "@/contexts/features/notification-context"
import { usePage } from "@/hooks/use-page"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { AlertCircle, AlertTriangle, ArrowLeft, Bell, CheckCircle2, Info, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Notification detail page component
 * Displays detailed information about a single notification
 */
export default function NotificationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { notifications, markAsRead, removeNotification } = useNotificationContext()
  const [notification, setNotification] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Get notification ID from URL params
  const id = params.id as string
  
  // Set page title and breadcrumb
  usePage({ title: notification?.title || "Notification Details" })
  
  // Find the notification by ID
  useEffect(() => {
    if (id) {
      const found = notifications.find(n => n.id === id)
      if (found) {
        setNotification(found)
        
        // Mark as read when viewing details
        if (!found.read) {
          markAsRead(id)
        }
      }
      setLoading(false)
    }
  }, [id, notifications, markAsRead])
  
  // Handle back button click
  const handleBack = () => {
    router.back()
  }
  
  // Handle delete button click
  const handleDelete = () => {
    removeNotification(id)
    router.push('/notifications')
  }
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-6 w-6 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-amber-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case "system":
        return <Bell className="h-6 w-6 text-purple-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Loading notification...</h1>
        </div>
      </div>
    )
  }
  
  // Not found state
  if (!notification) {
    return (
      <div className="container py-6">
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notification not found</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
            <h2 className="mt-4 text-xl font-medium">Notification not found</h2>
            <p className="text-muted-foreground mt-2">
              The notification you're looking for doesn't exist or has been deleted.
            </p>
            <Button className="mt-6" onClick={() => router.push('/notifications')}>
              View all notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="container py-6">
      <div className="flex items-center space-x-2 mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Notification Details</h1>
      </div>
      
      <Card>
        <CardHeader className={cn(
          "flex flex-row items-center gap-4",
          notification.priority === "urgent" && "bg-red-50 dark:bg-red-950/20",
          notification.priority === "high" && "bg-amber-50 dark:bg-amber-950/20"
        )}>
          <div>
            {notification.icon || getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <CardTitle className={cn(
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
            </CardTitle>
            <CardDescription>
              {notification.category && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200 mr-2">
                  {notification.category}
                </span>
              )}
              <span>
                {formatDistanceToNow(notification.date, { addSuffix: true })}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base">{notification.message}</p>
            
            {notification.link && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push(notification.link as string)}
                >
                  View Related Content
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Details</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-medium capitalize">{notification.type}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Priority</dt>
                <dd className="font-medium capitalize">{notification.priority || "Medium"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Created</dt>
                <dd className="font-medium">{format(notification.date, 'PPpp')}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium">{notification.read ? "Read" : "Unread"}</dd>
              </div>
              {notification.category && (
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">{notification.category}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted-foreground">ID</dt>
                <dd className="font-mono text-xs">{notification.id}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Notification
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}