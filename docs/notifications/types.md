# Notification Types

This document describes the type definitions used in the notification system.

## Core Types

### NotificationType

The type of notification, which affects its appearance and behavior.

```typescript
type NotificationType = "info" | "success" | "warning" | "error" | "system"
```

- `info`: General informational messages (blue)
- `success`: Success messages (green)
- `warning`: Warning messages (amber/yellow)
- `error`: Error messages (red)
- `system`: System-level messages (purple)

### NotificationPriority

The priority level of a notification, which can affect its visibility and persistence.

```typescript
type NotificationPriority = "low" | "medium" | "high" | "urgent"
```

- `low`: Low-priority notifications
- `medium`: Standard priority (default)
- `high`: High-priority notifications that should grab attention
- `urgent`: Critical notifications that require immediate action

## Interfaces

### Notification

The core notification interface representing a single notification.

```typescript
interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority?: NotificationPriority
  read: boolean
  date: Date
  readAt?: Date
  category?: string
  link?: string
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  icon?: React.ReactNode
  actions?: NotificationAction[]
  metadata?: Record<string, any>
}
```

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the notification |
| `title` | `string` | Title/heading of the notification |
| `message` | `string` | Main content of the notification |
| `type` | `NotificationType` | Type of notification (info, success, warning, error, system) |
| `priority` | `NotificationPriority` | Priority level (low, medium, high, urgent) |
| `read` | `boolean` | Whether the notification has been read |
| `date` | `Date` | When the notification was created |
| `readAt` | `Date` | When the notification was marked as read |
| `category` | `string` | Category for grouping/filtering notifications |
| `link` | `string` | Optional URL to navigate to when clicked |
| `autoClose` | `boolean` | Whether the notification should auto-close |
| `autoCloseDelay` | `number` | Delay in milliseconds before auto-closing |
| `persistent` | `boolean` | Whether the notification should persist after clearing all |
| `icon` | `React.ReactNode` | Custom icon to display |
| `actions` | `NotificationAction[]` | Action buttons for the notification |
| `metadata` | `Record<string, any>` | Additional data for the notification |

### NotificationAction

Represents an action button that can be displayed within a notification.

```typescript
interface NotificationAction {
  label: string
  onClick: (notification: Notification) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}
```

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Text to display on the button |
| `onClick` | `function` | Function to call when the button is clicked |
| `variant` | `string` | Visual style of the button |

### NotificationResponse

Represents a notification response from the API.

```typescript
interface NotificationResponse {
  id: string
  title: string
  message: string
  type: string
  priority?: string
  read: boolean
  createdAt: string
  readAt?: string
  category?: string
  link?: string
  metadata?: any
}
```

### CreateNotificationOptions

Options for creating a new notification.

```typescript
interface CreateNotificationOptions {
  title: string
  message: string
  type: NotificationType
  priority?: NotificationPriority
  category?: string
  link?: string
  autoClose?: boolean
  autoCloseDelay?: number
  persistent?: boolean
  icon?: React.ReactNode
  actions?: NotificationAction[]
  metadata?: Record<string, any>
}
```

### ToastOptions

Options for creating a toast notification.

```typescript
interface ToastOptions {
  title?: string
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  onClose?: () => void
  actions?: NotificationAction[]
}
```

### NotificationFilterOptions

Options for filtering notifications.

```typescript
interface NotificationFilterOptions {
  limit?: number
  read?: boolean
  type?: NotificationType
  category?: string
}
```

## Notification Context

The notification context provides the following interface:

```typescript
interface NotificationContextProps {
  // Notification state
  notifications: Notification[]
  unreadCount: number
  isConnected: boolean
  connectionStatus: 'connected' | 'disconnected' | 'error' | 'initial'
  
  // Core notification actions
  addNotification: (notification: Omit<Notification, "id" | "date" | "read"> & { id?: string, date?: Date, read?: boolean }) => string
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  
  // Read status management
  markAsRead: (id: string) => void
  markAsUnread: (id: string) => void
  markAllAsRead: () => void
  
  // Notification helpers
  showSuccess: (title: string, message: string, options?: Partial<Notification>) => string
  showError: (title: string, message: string, options?: Partial<Notification>) => string
  showWarning: (title: string, message: string, options?: Partial<Notification>) => string
  showInfo: (title: string, message: string, options?: Partial<Notification>) => string
  
  // Toast helpers
  toast: {
    success: (message: string, options?: ToastOptions) => string
    error: (message: string, options?: ToastOptions) => string
    warning: (message: string, options?: ToastOptions) => string
    info: (message: string, options?: ToastOptions) => string
  }
  
  // Filtering and querying
  getUnreadNotifications: () => Notification[]
  getNotificationsByType: (type: NotificationType) => Notification[]
  getNotificationsByCategory: (category: string) => Notification[]
  
  // Backend synchronization
  syncWithServer: () => Promise<void>
  connectToSSE: () => void
  disconnectFromSSE: () => void
}
```

## Type Usage Examples

### Creating a Basic Notification

```typescript
import { useNotifications } from "@/hooks/use-notifications"
import { NotificationType } from "@/lib/notification-types"

function createNotification(
  title: string,
  message: string,
  type: NotificationType
) {
  const notifications = useNotifications()
  
  notifications.add({
    title,
    message,
    type
  })
}
```

### Creating a Notification with Actions

```typescript
import { useNotifications } from "@/hooks/use-notifications"
import { NotificationAction } from "@/lib/notification-types"

function createNotificationWithActions() {
  const notifications = useNotifications()
  
  const actions: NotificationAction[] = [
    {
      label: "View",
      onClick: (notification) => {
        console.log("View clicked", notification)
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
  
  notifications.add({
    title: "New Message",
    message: "You have received a new message",
    type: "info",
    actions
  })
}
```

### Filtering Notifications

```typescript
import { useNotifications } from "@/hooks/use-notifications"

function getFilteredNotifications() {
  const notifications = useNotifications()
  
  // Get all unread notifications
  const unread = notifications.getUnread()
  
  // Get all error notifications
  const errors = notifications.getByType("error")
  
  // Get all system category notifications
  const system = notifications.getByCategory("system")
  
  // Combine filters manually
  const unreadErrors = notifications.getAll().filter(
    n => !n.read && n.type === "error"
  )
  
  return {
    unread,
    errors,
    system,
    unreadErrors
  }
}
```