# Notification Hooks

This document describes the available notification hooks and their usage.

## useNotifications

The main hook for using the notification system. It provides a simplified API for showing and managing notifications.

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function MyComponent() {
  const notifications = useNotifications()
  
  // Now you can use various notification methods
}
```

### Available Methods

| Method | Description |
|--------|-------------|
| `success(title, message, options?)` | Show a success notification |
| `error(title, message, options?)` | Show an error notification |
| `warning(title, message, options?)` | Show a warning notification |
| `info(title, message, options?)` | Show an info notification |
| `add(notification)` | Add a custom notification |
| `remove(id)` | Remove a notification by ID |
| `markRead(id)` | Mark a notification as read |
| `markUnread(id)` | Mark a notification as unread |
| `markAllRead()` | Mark all notifications as read |
| `clearAll()` | Clear all notifications |
| `getAll()` | Get all notifications |
| `getUnread()` | Get unread notifications |
| `getByType(type)` | Get notifications by type |
| `getByCategory(category)` | Get notifications by category |

### Available Properties

| Property | Description |
|----------|-------------|
| `unreadCount` | Number of unread notifications |
| `isConnected` | Whether connected to the notification server |
| `connectionStatus` | Current connection status |
| `toast` | Toast notification methods (see useToast) |

### Example

```tsx
import { useNotifications } from "@/hooks/use-notifications"

function NotificationDemo() {
  const notifications = useNotifications()
  
  return (
    <div>
      <h2>Notification Demo</h2>
      <div>Unread: {notifications.unreadCount}</div>
      <div>Connected: {notifications.isConnected ? "Yes" : "No"}</div>
      
      <div className="flex space-x-2 mt-4">
        <button 
          onClick={() => notifications.success("Success", "Operation completed successfully")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Success
        </button>
        
        <button 
          onClick={() => notifications.error("Error", "Something went wrong")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Error
        </button>
        
        <button 
          onClick={() => notifications.warning("Warning", "This action may have consequences")}
          className="px-4 py-2 bg-amber-500 text-white rounded"
        >
          Warning
        </button>
        
        <button 
          onClick={() => notifications.info("Info", "Here's something you should know")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Info
        </button>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => notifications.markAllRead()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
        >
          Mark All Read
        </button>
        
        <button 
          onClick={() => notifications.clearAll()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}
```

## useToast

A hook specifically for showing toast-style notifications that automatically disappear after a delay.

```tsx
import { useToast } from "@/hooks/use-notifications"

function MyComponent() {
  const toast = useToast()
  
  // Now you can show toast notifications
}
```

### Available Methods

| Method | Description |
|--------|-------------|
| `success(message, options?)` | Show a success toast |
| `error(message, options?)` | Show an error toast |
| `warning(message, options?)` | Show a warning toast |
| `info(message, options?)` | Show an info toast |

### Toast Options

| Option | Type | Description |
|--------|------|-------------|
| `title` | `string` | Custom title for the toast |
| `duration` | `number` | Duration in milliseconds before auto-close |
| `position` | `string` | Position on the screen |
| `onClose` | `() => void` | Function to call when the toast closes |
| `actions` | `NotificationAction[]` | Action buttons for the toast |

### Example

```tsx
import { useToast } from "@/hooks/use-notifications"

function ToastDemo() {
  const toast = useToast()
  
  return (
    <div>
      <h2>Toast Demo</h2>
      
      <div className="flex space-x-2 mt-4">
        <button 
          onClick={() => toast.success("Operation completed successfully")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Success Toast
        </button>
        
        <button 
          onClick={() => toast.error("Something went wrong", { 
            title: "Error Occurred",
            duration: 10000 // 10 seconds
          })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Error Toast (10s)
        </button>
        
        <button 
          onClick={() => toast.warning("This action may have consequences")}
          className="px-4 py-2 bg-amber-500 text-white rounded"
        >
          Warning Toast
        </button>
        
        <button 
          onClick={() => toast.info("Here's something you should know")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Info Toast
        </button>
      </div>
    </div>
  )
}
```

## useNotificationItem

A hook for managing a single notification, typically used in detail views or custom notification components.

```tsx
import { useNotificationItem } from "@/hooks/use-notification-item"

function NotificationDetail({ id }) {
  const { 
    notification, 
    loading, 
    error, 
    refetch,
    markAsRead,
    deleteNotification
  } = useNotificationItem(id)
  
  // Now you can work with a single notification
}
```

### Return Values

| Value | Type | Description |
|-------|------|-------------|
| `notification` | `Notification \| null` | The notification object or null if not found |
| `loading` | `boolean` | Whether the notification is loading |
| `error` | `Error \| null` | Error that occurred while loading |
| `refetch` | `() => Promise<Notification \| null>` | Function to reload the notification |
| `markAsRead` | `() => Promise<boolean>` | Function to mark the notification as read |
| `deleteNotification` | `() => Promise<boolean>` | Function to delete the notification |

### Example

```tsx
import { useNotificationItem } from "@/hooks/use-notification-item"

function NotificationDetail({ id }) {
  const { 
    notification, 
    loading, 
    error, 
    markAsRead,
    deleteNotification
  } = useNotificationItem(id)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!notification) return <div>Notification not found</div>
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold">{notification.title}</h2>
      <p className="mt-2">{notification.message}</p>
      <div className="mt-4 flex space-x-2">
        {!notification.read && (
          <button 
            onClick={markAsRead}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Mark as Read
          </button>
        )}
        <button 
          onClick={deleteNotification}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
```

## useNotificationList

A hook for fetching and managing a list of notifications, typically used in notification lists or custom notification components.

```tsx
import { useNotificationList } from "@/hooks/use-notification-list"

function MyNotificationList() {
  const { 
    notifications, 
    loading, 
    error, 
    refetch,
    markAllAsRead,
    clearAll,
    connectionStatus
  } = useNotificationList({
    limit: 10,
    read: false,
    type: "error",
    category: "system",
    realtime: true,
    autoFetch: true
  })
  
  // Now you can work with a list of notifications
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `limit` | `number` | - | Maximum number of notifications to fetch |
| `read` | `boolean` | - | Filter by read status |
| `type` | `NotificationType` | - | Filter by notification type |
| `category` | `string` | - | Filter by category |
| `realtime` | `boolean` | `true` | Whether to subscribe to real-time updates |
| `autoFetch` | `boolean` | `true` | Whether to fetch automatically on mount |

### Return Values

| Value | Type | Description |
|-------|------|-------------|
| `notifications` | `Notification[]` | Array of notifications |
| `loading` | `boolean` | Whether the notifications are loading |
| `error` | `Error \| null` | Error that occurred while loading |
| `refetch` | `() => Promise<Notification[]>` | Function to reload the notifications |
| `markAllAsRead` | `() => Promise<boolean>` | Function to mark all notifications as read |
| `clearAll` | `() => Promise<boolean>` | Function to clear all notifications |
| `connectionStatus` | `'connected' \| 'disconnected' \| 'error'` | Current connection status |

### Example

```tsx
import { useNotificationList } from "@/hooks/use-notification-list"
import { NotificationItem } from "@/components/features/notification/notification-item"

function UnreadNotifications() {
  const { 
    notifications, 
    loading, 
    error, 
    refetch,
    markAllAsRead,
    connectionStatus
  } = useNotificationList({
    read: false,
    realtime: true
  })
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Unread Notifications</h2>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            {connectionStatus === 'connected' ? 'Live' : 
             connectionStatus === 'error' ? 'Connection Error' : 'Disconnected'}
          </div>
          <button 
            onClick={refetch}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          >
            Refresh
          </button>
          <button 
            onClick={markAllAsRead}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Mark All Read
          </button>
        </div>
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No unread notifications
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={() => refetch()}
              onDelete={() => refetch()}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

## useNotificationContext

The full notification context with all available methods and properties. This is the most powerful but also most complex hook, and in most cases, you should use one of the simplified hooks above.

```tsx
import { useNotificationContext } from "@/contexts/features/notification-context"

function MyComponent() {
  const context = useNotificationContext()
  
  // Now you have access to the full notification context
}
```

See the [Notification Context](./types.md#notification-context) documentation for details on the available methods and properties.