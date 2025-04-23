// components/notification-list.tsx
"use client"

interface NotificationListProps {
  notifications: any[]
}

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <ul>
      {notifications.map((notification) => (
        <li key={notification.id}>{notification.message}</li>
      ))}
    </ul>
  )
}
