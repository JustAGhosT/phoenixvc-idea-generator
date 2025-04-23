# Notification System Usage Guide

This guide provides practical examples of how to use the notification system in your application.

## Basic Usage

The simplest way to use notifications is with the `useNotifications` hook:

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function MyComponent() {
  const notifications = useNotifications()
  
  const handleSuccess = () => {
    notifications.success(
      "Operation Successful", 
      "Your operation was completed successfully."
    )
  }
  
  const handleError = () => {
    notifications.error(
      "Error Occurred", 
      "There was an error processing your request."
    )
  }
  
  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </div>
  )
}
```

## Toast Notifications

For temporary toast-style notifications, use the `useToast` hook:

```tsx
import { useToast } from "@/hooks/use-notifications"

function MyComponent() {
  const toast = useToast()
  
  const showToasts = () => {
    // Basic toast
    toast.success("Item created successfully!")
    
    // With custom duration (milliseconds)
    toast.error("Failed to save changes", { 
      duration: 10000 // 10 seconds
    })
    
    // With custom title
    toast.warning("Connection issues detected", { 
      title: "Network Warning"
    })
  }
  
  return (
    <button onClick={showToasts}>Show Toasts</button>
  )
}
```

## Notifications with Actions

You can add action buttons to notifications:

```tsx
import { useNotifications } from "@/hooks/use-notifications"
import { useRouter } from "next/navigation"

function MyComponent() {
  const notifications = useNotifications()
  const router = useRouter()
  
  const showNotificationWithActions = () => {
    notifications.add({
      title: "New Message",
      message: "You have received a new message from John Doe.",
      type: "info",
      actions: [
        {
          label: "View",
          onClick: (notification) => {
            router.push("/messages/123")
            notifications.markRead(notification.id)
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
  
  return (
    <button onClick={showNotificationWithActions}>
      Show Notification with Actions
    </button>
  )
}
```

## High Priority Notifications

For important notifications that require attention:

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function MyComponent() {
  const notifications = useNotifications()
  
  const showUrgentNotification = () => {
    notifications.add({
      title: "System Update Required",
      message: "A critical system update is required. Please save your work and restart the application.",
      type: "error",
      priority: "urgent",
      persistent: true, // Won't be automatically cleared
      actions: [
        {
          label: "Update Now",
          onClick: () => {
            // Handle update
          },
          variant: "destructive"
        },
        {
          label: "Remind Me Later",
          onClick: (notification) => {
            notifications.remove(notification.id)
          },
          variant: "outline"
        }
      ]
    })
  }
  
  return (
    <button onClick={showUrgentNotification}>
      Show Urgent Notification
    </button>
  )
}
```

## Managing Notifications

You can manage notifications using the methods provided by the `useNotifications` hook:

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function NotificationManager() {
  const notifications = useNotifications()
  
  // Get all notifications
  const allNotifications = notifications.getAll()
  
  // Get unread notifications
  const unreadNotifications = notifications.getUnread()
  
  // Get notifications by type
  const errorNotifications = notifications.getByType("error")
  
  // Get notifications by category
  const systemNotifications = notifications.getByCategory("system")
  
  // Mark a notification as read
  const markAsRead = (id) => notifications.markRead(id)
  
  // Mark all notifications as read
  const markAllAsRead = () => notifications.markAllRead()
  
  // Remove a notification
  const removeNotification = (id) => notifications.remove(id)
  
  // Clear all notifications
  const clearAll = () => notifications.clearAll()
  
  return (
    <div>
      <h2>Notification Manager</h2>
      <div>Unread Count: {notifications.unreadCount}</div>
      <button onClick={markAllAsRead}>Mark All as Read</button>
      <button onClick={clearAll}>Clear All</button>
      
      <h3>All Notifications</h3>
      <ul>
        {allNotifications.map(notification => (
          <li key={notification.id}>
            {notification.title}
            <button onClick={() => markAsRead(notification.id)}>
              Mark as Read
            </button>
            <button onClick={() => removeNotification(notification.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Adding the Notification Button to Header

To add the notification bell with dropdown to your header:

```tsx
import { NotificationButton } from "@/components/features/notification/notification-button"

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div>Logo</div>
      <div className="flex items-center space-x-2">
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  )
}
```

## Creating a Notifications Page

For a dedicated notifications page:

```tsx
// app/notifications/page.tsx
import { Notifications } from "@/components/features/notification/notifications"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <Notifications 
        showSearch={true}
        showFilters={true}
        showConnectionStatus={true}
      />
    </div>
  )
}
```

## Connection Status Indicator

To display the real-time connection status:

```tsx
import { ConnectionStatus } from "@/components/notifications/connection-status"

function StatusBar() {
  return (
    <div className="flex items-center justify-end p-2 bg-gray-100">
      <ConnectionStatus />
    </div>
  )
}
```

## Next Steps

For more detailed information about the notification components and their props, see the [Components](./components.md) documentation. For information about the available hooks, see the [Hooks](./hooks.md) documentation.