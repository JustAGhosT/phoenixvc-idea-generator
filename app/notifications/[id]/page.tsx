// app/notifications/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { NotificationItem } from "@/components/notification-item"

export default function NotificationDetailsPage() {
  const params = useParams()
  const { id } = params

  return (
    <div>
      <h1>Notification Details</h1>
      <NotificationItem id={id as string} />
    </div>
  )
}
