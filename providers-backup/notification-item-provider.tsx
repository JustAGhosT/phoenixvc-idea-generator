// providers/notification-item-provider.tsx
import type React from "react"
import { useNotificationItem } from "@/hooks/use-notification-item"

interface NotificationItemProviderProps {
  children: React.ReactNode
  id: string
}

export function NotificationItemProvider({ children, id }: NotificationItemProviderProps) {
  const { notification, loading, error } = useNotificationItem(id)

  return <div>{children}</div>
}
