# Notification System Documentation

This document provides a comprehensive guide to the notification system in our application. It covers the core concepts, components, and usage patterns to help developers effectively work with notifications.

## Table of Contents

1. [Overview](#overview)
2. [Notification Context](#notification-context)
3. [Notification Hooks](#notification-hooks)
4. [Notification Components](#notification-components)
5. [Notification Types and Priorities](#notification-types-and-priorities)
6. [Backend Integration](#backend-integration)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Overview

Our notification system provides a comprehensive solution for displaying and managing notifications throughout the application. It supports:

- **Multiple notification types** (info, success, warning, error, system)
- **Priority levels** (low, medium, high, urgent)
- **Toast notifications** for temporary messages
- **Persistent notifications** in a notification center
- **Read/unread status tracking**
- **Action buttons** within notifications
- **Categorization** for organization
- **Local storage persistence** to maintain notifications across sessions

The system is designed to be flexible, user-friendly, and developer-friendly, with clear patterns for creating and managing notifications.

## Notification Context

The notification context (`NotificationContext`) is the central piece of our notification system. It provides access to the notification state and methods throughout the application.

### Location

```
contexts/features/notification-context.tsx
```

### Key Features

- Notification state management
- Adding and removing notifications
- Marking notifications as read/unread
- Filtering notifications by type, category, or read status
- Notification persistence in localStorage
- Auto-closing notifications

### Notification Interface

```typescript
interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority?: NotificationPriority
  read: boolean
  date: Date
  link?: string
  category?: string
  actions?: NotificationAction[]
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  icon?: React.ReactNode
}
```

### Usage

The context is automatically provided at the application root level, so you don't need to wrap your components with it manually. Instead, use the notification hooks to access the context.

## Notification Hooks

We provide several specialized hooks for different notification needs:

### `useNotifications()`

A simplified hook for using the notification system.

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function MyComponent() {
  const notifications = useNotifications()
  
  // Show different types of notifications
  notifications.success("Success!", "Operation completed successfully")
  notifications.error("Error", "Something went wrong")
  notifications.warning("Warning", "This action may have consequences")
  notifications.info("Information", "Here's something you should know")
  
  // Add a custom notification
  notifications.add({
    title: "Custom Notification",
    message: "This is a custom notification",
    type: "info",
    category: "Custom",
    priority: "medium"
  })
  
  // Get all notifications
  const allNotifications = notifications.getAll()
  
  // Get unread count
  const unreadCount = notifications.unreadCount
  
  // Mark a notification as read
  notifications.markRead("notification-id")
  
  // Mark all notifications as read
  notifications.markAllRead()
  
  // Remove a notification
  notifications.remove("notification-id")
  
  // Clear all notifications
  notifications.clearAll()
}
```

### `useToast()`

A hook for showing toast-style notifications.

```tsx
import { useToast } from "@/hooks/use-notifications"

function MyComponent() {
  const toast = useToast()
  
  // Show different types of toasts
  toast.success("Operation successful!")
  toast.error("Something went wrong")
  toast.warning("This action may have consequences")
  toast.info("Here's something you should know")
  
  // With custom options
  toast.success("Operation successful!", {
    title: "Custom Title",
    duration: 5000 // 5 seconds
  })
}
```

### `useNotificationContext()`

The full notification context with all available methods and properties.

```tsx
import { useNotificationContext } from "@/contexts/features/notification-context"

function MyComponent() {
  const {
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    getUnreadNotifications,
    getNotificationsByType,
    getNotificationsByCategory
  } = useNotificationContext()
  
  // Use the notification context
}
```

## Notification Components

We provide several reusable notification components:

### `Notifications`

A notification bell component with dropdown for displaying notifications in the header.

```tsx
import { Notifications } from "@/components/layout/notifications"

function Header() {
  return (
    <header>
      {/* Other header content */}
      <Notifications 
        maxDisplayed={5}
        showBadge={true}
        animateBell={true}
      />
    </header>
  )
}
```

### `ToastNotifications`

A component for displaying toast-style notifications.

```tsx
import { ToastNotifications } from "@/components/notifications/toast-notifications"

function Layout({ children }) {
  return (
    <div>
      {children}
      <ToastNotifications 
        position="bottom-right"
        maxToasts={3}
        showCloseButton={true}
      />
    </div>
  )
}
```

### Notification Pages

We also provide complete pages for viewing and managing notifications:

- `/notifications` - Notification center for viewing all notifications
- `/notifications/[id]` - Detailed view of a single notification
- `/notifications/demo` - Demo page showcasing notification features

## Notification Types and Priorities

### Types

- `info` - Informational messages (blue)
- `success` - Success messages (green)
- `warning` - Warning messages (amber)
- `error` - Error messages (red)
- `system` - System messages (purple)

### Priorities

- `low` - Low priority notifications
- `medium` - Medium priority notifications (default)
- `high` - High priority notifications
- `urgent` - Urgent notifications that require immediate attention

## Backend Integration

The notification system can be integrated with a backend API using the `notificationService`.

### Location

```
lib/notification-service.ts
```

### Available Methods

- `getNotifications()` - Fetch all notifications
- `getNotificationById(id)` - Fetch a single notification
- `markAsRead(id)` - Mark a notification as read
- `markAllAsRead()` - Mark all notifications as read
- `deleteNotification(id)` - Delete a notification
- `createNotification(notification)` - Create a new notification
- `clearAllNotifications()` - Clear all notifications

### Usage

```tsx
import { notificationService } from "@/lib/notification-service"

// Fetch notifications from the backend
async function fetchNotifications() {
  const notifications = await notificationService.getNotifications()
  // Do something with the notifications
}

// Create a notification on the backend
async function createNotification() {
  const notification = await notificationService.createNotification({
    title: "New Notification",
    message: "This notification was created on the backend",
    type: "info"
  })
  // Do something with the new notification
}
```

## Usage Examples

### Basic Usage

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

### With Action Buttons

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

### Toast Notifications

```tsx
import { useToast } from "@/hooks/use-notifications"

function MyComponent() {
  const toast = useToast()
  
  const showToasts = () => {
    toast.success("Item created successfully!")
    
    // With custom duration
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

### Urgent Notifications

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
      persistent: true,
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

## Best Practices

### When to Use Different Notification Types

- **Info**: Use for general information that doesn't require immediate action
- **Success**: Use after a successful operation or action
- **Warning**: Use for potential issues that don't prevent the user from continuing
- **Error**: Use for errors that prevent the user from completing an action
- **System**: Use for system-level messages like maintenance or updates

### When to Use Different Priorities

- **Low**: Use for informational messages that aren't time-sensitive
- **Medium**: Use for standard notifications (default)
- **High**: Use for important notifications that should grab the user's attention
- **Urgent**: Use sparingly for critical issues that require immediate action

### Notification Content Guidelines

1. **Be concise**: Keep titles and messages short and to the point
2. **Be specific**: Clearly communicate what happened or what action is needed
3. **Be helpful**: Provide guidance on what the user should do next
4. **Be consistent**: Use similar language and tone across all notifications
5. **Be accessible**: Ensure notifications are readable and understandable

### Performance Considerations

1. **Limit the number of notifications**: Don't overwhelm the user with too many notifications
2. **Use auto-close for transient messages**: Success messages and info notifications should auto-close
3. **Batch notifications when possible**: Group related notifications together
4. **Clean up old notifications**: Periodically remove old, read notifications
5. **Use persistent storage judiciously**: Don't store large amounts of notification data

## Troubleshooting

### Common Issues

#### Notifications not appearing

- Check that the `NotificationProvider` is properly set up in your application
- Verify that the `ToastNotifications` component is included in your layout
- Check for errors in the console

#### Notifications not persisting

- Ensure `persistNotifications` is set to `true` in the `NotificationProvider`
- Check that localStorage is available and not full
- Verify that the notifications are being properly serialized

#### Auto-close not working

- Ensure `autoClose` is set to `true` for the notification
- Check that `autoCloseDelay` is set to a reasonable value (in milliseconds)
- Verify that there are no errors preventing the timeout from executing

### Getting Help

If you encounter issues not covered in this documentation, please:

1. Check the source code in `contexts/features/notification-context.tsx` and `hooks/use-notifications.ts`
2. Review the demo page at `/notifications/demo` for usage examples
3. Contact the development team for assistance