// providers/notification-service-provider-provider.tsx
import type React from "react"
import { useNotificationService } from "@/hooks/use-notification-service"

interface NotificationServiceProviderProps {
  children: React.ReactNode
}

export function NotificationServiceProvider({ children }: NotificationServiceProviderProps) {
  const { notifications, loading, fetchNotifications } = useNotificationService()

  return <div>{children}</div>
}
