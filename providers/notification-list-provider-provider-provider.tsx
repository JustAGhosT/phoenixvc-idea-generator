// providers/notification-list-provider-provider-provider.tsx
import type React from "react"
import { useNotificationList } from "@/hooks/use-notification-list"

interface NotificationListProviderProps {
  children: React.ReactNode
}

export function NotificationListProvider({ children }: NotificationListProviderProps) {
  const { notifications, loading, error } = useNotificationList()

  return <div>{children}</div>
}
