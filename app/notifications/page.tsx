// app/notifications/page.tsx
"use client"

import { NotificationList } from "@/components/notification-list"

export default function NotificationsPage() {
  return (
    <div>
      <h1>Notifications</h1>
      <NotificationList />
    </div>
  )
}
