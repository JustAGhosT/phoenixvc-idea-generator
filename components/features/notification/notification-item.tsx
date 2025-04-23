// components/notification-item.tsx
"use client"

import { useEffect, useState } from "react"

interface NotificationItemProps {
  id: string
}

export function NotificationItem({ id }: NotificationItemProps) {
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Simulate fetching a notification
    setTimeout(() => {
      setNotification({ id, message: `Notification with ID ${id}` })
    }, 500)
  }, [id])

  return <div>{notification ? notification.message : "Loading..."}</div>
}
