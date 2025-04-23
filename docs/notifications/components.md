# Notification Components

This document describes the available notification components and their props.

## NotificationProvider

The root component that provides the notification context to your application.

```tsx
import { NotificationProvider } from "@/components/features/notification/notification-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider
          maxNotifications={50}
          storageKey="app_notifications"
          persistNotifications={true}
          autoConnect={true}
          toastPosition="top-right"
          maxToasts={5}
        >
          {children}
        </NotificationProvider>
      </body>
    </html>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxNotifications` | `number` | `50` | Maximum number of notifications to store |
| `storageKey` | `string` | `"app_notifications"` | Key for localStorage persistence |
| `persistNotifications` | `boolean` | `true` | Whether to persist notifications in localStorage |
| `autoConnect` | `boolean` | `true` | Whether to automatically connect to SSE |
| `toastPosition` | `string` | `"top-right"` | Position for toast notifications |
| `maxToasts` | `number` | `5` | Maximum number of toasts to show at once |

## NotificationItem

A component for displaying a single notification.

```tsx
import { NotificationItem } from "@/components/features/notification/notification-item"

function MyComponent() {
  return (
    <NotificationItem
      notification={notification}
      onMarkRead={handleMarkRead}
      onDelete={handleDelete}
      onClick={handleClick}
    />
  )
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `notification` | `Notification` | The notification object to display |
| `onMarkRead` | `(id: string) => void` | Function to call when marking as read |
| `onDelete` | `(id: string) => void` | Function to call when deleting |
| `onClick` | `(notification: Notification) => void` | Function to call when clicking |
| `className` | `string` | Additional CSS classes |

## NotificationList

A component for displaying a list of notifications.

```tsx
import { NotificationList } from "@/components/features/notification/notification-list"

function MyComponent() {
  return (
    <NotificationList
      notifications={notifications}
      onMarkRead={handleMarkRead}
      onMarkAllRead={handleMarkAllRead}
      onDelete={handleDelete}
      onClearAll={handleClearAll}
      onRefresh={handleRefresh}
      onNotificationClick={handleNotificationClick}
      emptyMessage="No notifications yet"
      showControls={true}
      showConnectionStatus={true}
      maxHeight="400px"
    />
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `notifications` | `Notification[]` | - | Array of notifications to display |
| `loading` | `boolean` | `false` | Whether the notifications are loading |
| `error` | `Error \| null` | `null` | Error that occurred while loading |
| `onMarkRead` | `(id: string) => void` | - | Function to call when marking as read |
| `onMarkAllRead` | `() => void` | - | Function to call when marking all as read |
| `onDelete` | `(id: string) => void` | - | Function to call when deleting |
| `onClearAll` | `() => void` | - | Function to call when clearing all |
| `onRefresh` | `() => void` | - | Function to call when refreshing |
| `onNotificationClick` | `(notification: Notification) => void` | - | Function to call when clicking |
| `emptyMessage` | `string` | `"No notifications"` | Message to show when there are no notifications |
| `className` | `string` | - | Additional CSS classes |
| `showControls` | `boolean` | `true` | Whether to show the control buttons |
| `showConnectionStatus` | `boolean` | `true` | Whether to show the connection status |
| `maxHeight` | `string \| number` | `"400px"` | Maximum height of the list |
| `filter` | `object` | - | Filter options for the notifications |

## NotificationBadge

A component for displaying the unread notification count.

```tsx
import { NotificationBadge } from "@/components/features/notification/notification-badge"

function MyComponent() {
  return (
    <button className="relative">
      <BellIcon />
      <NotificationBadge count={5} max={99} showZero={false} />
    </button>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | - | Number of unread notifications (uses context if not provided) |
| `max` | `number` | `99` | Maximum number to display before showing "99+" |
| `className` | `string` | - | Additional CSS classes |
| `showZero` | `boolean` | `false` | Whether to show the badge when count is 0 |

## NotificationButton

A button with a notification badge that opens a dropdown with notifications.

```tsx
import { NotificationButton } from "@/components/features/notification/notification-button"

function Header() {
  return (
    <header>
      <div className="flex items-center">
        <NotificationButton 
          popoverWidth={400}
          maxNotifications={10}
        />
        <UserMenu />
      </div>
    </header>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes for the button |
| `iconClassName` | `string` | - | Additional CSS classes for the icon |
| `badgeClassName` | `string` | - | Additional CSS classes for the badge |
| `popoverWidth` | `string \| number` | `400` | Width of the notification popover |
| `maxNotifications` | `number` | `10` | Maximum number of notifications to show |

## NotificationDialog

A dialog for displaying a single notification in detail.

```tsx
import { NotificationDialog } from "@/components/features/notification/notification-dialog"

function MyComponent() {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  return (
    <>
      <button onClick={() => {
        setSelectedId("notification-id")
        setOpen(true)
      }}>
        Open Notification
      </button>
      
      {selectedId && (
        <NotificationDialog
          id={selectedId}
          open={open}
          onOpenChange={setOpen}
          onMarkRead={() => console.log("Marked as read")}
          onDelete={() => console.log("Deleted")}
        />
      )}
    </>
  )
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the notification to display |
| `open` | `boolean` | Whether the dialog is open |
| `onOpenChange` | `(open: boolean) => void` | Function to call when the open state changes |
| `onMarkRead` | `() => void` | Function to call after marking as read |
| `onDelete` | `() => void` | Function to call after deleting |

## Notifications

A comprehensive component for a dedicated notifications page.

```tsx
import { Notifications } from "@/components/features/notification/notifications"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <Notifications 
        initialTab="all"
        showSearch={true}
        showFilters={true}
        showConnectionStatus={true}
      />
    </div>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialTab` | `string` | `"all"` | Initial active tab |
| `showSearch` | `boolean` | `true` | Whether to show the search input |
| `showFilters` | `boolean` | `true` | Whether to show the filter controls |
| `showConnectionStatus` | `boolean` | `true` | Whether to show the connection status |
| `className` | `string` | - | Additional CSS classes |

## ToastNotifications

A component for displaying toast-style notifications.

```tsx
import { ToastNotifications } from "@/components/notifications/toast-notifications"

function Layout({ children }) {
  return (
    <>
      {children}
      <ToastNotifications 
        position="top-right"
        maxToasts={5}
      />
    </>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `"top-right"` | Position of the toasts |
| `maxToasts` | `number` | `5` | Maximum number of toasts to show at once |
| `className` | `string` | - | Additional CSS classes |

## ConnectionStatus

A component for displaying the real-time connection status.

```tsx
import { ConnectionStatus } from "@/components/notifications/connection-status"

function StatusBar() {
  return (
    <div className="flex items-center">
      <span>Status:</span>
      <ConnectionStatus showText={true} size="md" />
    </div>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `showText` | `boolean` | `true` | Whether to show the status text |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the status indicator |