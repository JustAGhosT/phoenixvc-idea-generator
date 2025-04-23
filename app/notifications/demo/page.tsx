"use client"

import { NotificationConnectionStatus } from "@/components/notifications/connection-status"
import { ToastNotifications } from "@/components/notifications/toast-notifications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { NotificationPriority, NotificationType, useNotificationContext } from "@/contexts/features/notification-context"
import { useNotifications } from "@/hooks/use-notifications"
import { usePage } from "@/hooks/use-page"
import { useState } from "react"

/**
 * Notification demo page
 * Showcases all the notification features
 */
export default function NotificationDemoPage() {
  // Set page title and breadcrumb
  usePage({ title: "Notification Demo" })
  
  const notifications = useNotifications()
  const { connectToSSE, disconnectFromSSE } = useNotificationContext()
  
  // Form state for creating notifications
  const [title, setTitle] = useState("Sample Notification")
  const [message, setMessage] = useState("This is a sample notification message.")
  const [type, setType] = useState<NotificationType>("info")
  const [priority, setPriority] = useState<NotificationPriority>("medium")
  const [category, setCategory] = useState("General")
  const [autoClose, setAutoClose] = useState(false)
  const [autoCloseDelay, setAutoCloseDelay] = useState(5000)
  const [link, setLink] = useState("/dashboard")
  const [persistent, setPersistent] = useState(false)
  
  // Toast form state
  const [toastMessage, setToastMessage] = useState("This is a toast notification")
  const [toastType, setToastType] = useState<NotificationType>("success")
  const [toastDuration, setToastDuration] = useState(3000)
  
  // Handle creating a notification
  const handleCreateNotification = () => {
    notifications.add({
      title,
      message,
      type,
      priority,
      category,
      autoClose,
      autoCloseDelay,
      link: link || undefined,
      persistent,
      actions: [
        {
          label: "View",
          onClick: (notification) => {
            window.location.href = `/notifications/${notification.id}`
          },
          variant: "default"
        },
        {
          label: "Dismiss",
          onClick: (notification) => {
            notifications.remove(notification.id)
          },
          variant: "secondary"
        }
      ]
    })
  }
  
  // Handle showing a toast
  const handleShowToast = () => {
    switch (toastType) {
      case "success":
        notifications.success("Success", toastMessage, { 
          autoClose: true, 
          autoCloseDelay: toastDuration 
        })
        break
      case "error":
        notifications.error("Error", toastMessage, { 
          autoClose: true, 
          autoCloseDelay: toastDuration 
        })
        break
      case "warning":
        notifications.warning("Warning", toastMessage, { 
          autoClose: true, 
          autoCloseDelay: toastDuration 
        })
        break
      case "info":
        notifications.info("Information", toastMessage, { 
          autoClose: true, 
          autoCloseDelay: toastDuration 
        })
        break
      default:
        notifications.info("Information", toastMessage, { 
          autoClose: true, 
          autoCloseDelay: toastDuration 
        })
    }
  }
  
  // Create a demo notification of each type
  const createDemoNotifications = () => {
    notifications.success("Success Notification", "This is a success notification example.", {
      category: "Demo",
      priority: "low"
    })
    
    notifications.error("Error Notification", "This is an error notification example.", {
      category: "Demo",
      priority: "high"
    })
    
    notifications.warning("Warning Notification", "This is a warning notification example.", {
      category: "Demo",
      priority: "medium"
    })
    
    notifications.info("Info Notification", "This is an info notification example.", {
      category: "Demo",
      priority: "low"
    })
    
    notifications.add({
      title: "Urgent Notification",
      message: "This is an urgent notification that requires immediate attention.",
      type: "error",
      priority: "urgent",
      category: "Demo",
      persistent: true
    })
  }
  
  // Force disconnect/connect for testing
  const forceDisconnect = () => {
    disconnectFromSSE()
  }
  
  const forceReconnect = () => {
    connectToSSE()
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Demo</h1>
          <p className="text-muted-foreground mt-1">
            Explore and test the notification system
          </p>
        </div>
        
        {/* Connection status indicator */}
        <NotificationConnectionStatus />
      </div>
      
      {/* Real-time connection card */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Connection</CardTitle>
          <CardDescription>
            Test the real-time notification connection status
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The notification system uses Server-Sent Events (SSE) to receive real-time notifications.
              You can test the connection status by using the buttons below.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <NotificationConnectionStatus showReconnectButton={false} />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={forceDisconnect}>
                  Force Disconnect
                </Button>
                <Button variant="outline" size="sm" onClick={forceReconnect}>
                  Force Connect
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Notification</CardTitle>
            <CardDescription>
              Create a custom notification with various options
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Notification message"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as NotificationType)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={(value) => setPriority(value as NotificationPriority)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Notification category"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="link">Link (optional)</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="URL to navigate to when clicked"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-close"
                checked={autoClose}
                onCheckedChange={setAutoClose}
              />
              <Label htmlFor="auto-close">Auto-close notification</Label>
            </div>
            
            {autoClose && (
              <div className="grid gap-2">
                <Label htmlFor="auto-close-delay">Auto-close delay (ms)</Label>
                <Input
                  id="auto-close-delay"
                  type="number"
                  value={autoCloseDelay}
                  onChange={(e) => setAutoCloseDelay(parseInt(e.target.value))}
                  min={1000}
                  step={1000}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch
                id="persistent"
                checked={persistent}
                onCheckedChange={setPersistent}
              />
              <Label htmlFor="persistent">Persistent (won't be cleared by "Clear All")</Label>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button onClick={handleCreateNotification} className="w-full">
              Create Notification
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
              <CardDescription>
                Show temporary toast notifications
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="toast-message">Message</Label>
                <Input
                  id="toast-message"
                  value={toastMessage}
                  onChange={(e) => setToastMessage(e.target.value)}
                  placeholder="Toast message"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="toast-type">Type</Label>
                  <Select value={toastType} onValueChange={(value) => setToastType(value as NotificationType)}>
                    <SelectTrigger id="toast-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="toast-duration">Duration (ms)</Label>
                  <Input
                    id="toast-duration"
                    type="number"
                    value={toastDuration}
                    onChange={(e) => setToastDuration(parseInt(e.target.value))}
                    min={1000}
                    step={1000}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button onClick={handleShowToast} className="w-full">
                Show Toast
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Test notification system features
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={createDemoNotifications}>
                  Create Demo Notifications
                </Button>
                
                <Button variant="outline" onClick={() => notifications.markAllRead()}>
                  Mark All as Read
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => notifications.clearAll()}>
                  Clear All Notifications
                </Button>
                
                <Button 
                  variant="secondary" 
                  onClick={() => window.location.href = "/notifications"}
                >
                  View Notification Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Notifications</CardTitle>
          <CardDescription>
            You have {notifications.getAll().length} notifications ({notifications.unreadCount} unread)
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {notifications.getAll().length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No notifications to display. Create some using the form above.
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
                <div className="divide-y">
                  {notifications.getAll().map((notification) => (
                    <div key={notification.id} className="py-2">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => notifications.remove(notification.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="unread" className="max-h-[300px] overflow-y-auto">
                <div className="divide-y">
                  {notifications.getAll()
                    .filter(n => !n.read)
                    .map((notification) => (
                      <div key={notification.id} className="py-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => notifications.markRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="read" className="max-h-[300px] overflow-y-auto">
                <div className="divide-y">
                  {notifications.getAll()
                    .filter(n => n.read)
                    .map((notification) => (
                      <div key={notification.id} className="py-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => notifications.remove(notification.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
      
      {/* Toast container */}
      <ToastNotifications position="bottom-right" />
    </div>
  )
}