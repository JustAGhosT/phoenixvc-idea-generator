"use client"

import { Notifications } from "@/components/features/notification/notifications"
import { ConnectionStatus } from "@/components/notifications/connection-status"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useNotifications } from "@/hooks/use-notifications"
import { useState } from "react"

export default function NotificationDemo() {
  const notifications = useNotifications()
  const [title, setTitle] = useState("Test Notification")
  const [message, setMessage] = useState("This is a test notification message.")
  const [type, setType] = useState("info")
  const [category, setCategory] = useState("demo")
  
  const createNotification = () => {
    notifications.add({
      title,
      message,
      type: type as any,
      category,
    })
  }
  
  const createSuccessNotification = () => {
    notifications.success("Success", "Operation completed successfully")
  }
  
  const createErrorNotification = () => {
    notifications.error("Error", "Something went wrong")
  }
  
  const createWarningNotification = () => {
    notifications.warning("Warning", "This action may have consequences")
  }
  
  const createInfoNotification = () => {
    notifications.info("Information", "Here's something you should know")
  }
  
  const createToast = () => {
    notifications.toast.success("This is a toast notification")
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Notification Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Notification</CardTitle>
              <CardDescription>Fill out the form to create a custom notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Notification title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Notification message"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
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
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="Notification category"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={createNotification}>Create Notification</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Notifications</CardTitle>
                <CardDescription>Create predefined notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={createSuccessNotification} className="bg-green-500 hover:bg-green-600">Success</Button>
                  <Button onClick={createErrorNotification} variant="destructive">Error</Button>
                  <Button onClick={createWarningNotification} className="bg-amber-500 hover:bg-amber-600">Warning</Button>
                  <Button onClick={createInfoNotification} variant="default">Info</Button>
                  <Button onClick={createToast} variant="outline">Toast</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <ConnectionStatus showText={true} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Your notification center</CardDescription>
            </CardHeader>
            <CardContent>
              <Notifications 
                showSearch={true}
                showFilters={true}
                showConnectionStatus={true}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}