// providers/notification-api-provider.tsx
import type React from "react"
import { useNotificationApi } from "@/hooks/use-notification-api"

interface NotificationApiProviderProps {
  children: React.ReactNode
}

export function NotificationApiProvider({ children }: NotificationApiProviderProps) {
  const { notifications, loading, error } = useNotificationApi()

  return <div>{children}</div>
}
