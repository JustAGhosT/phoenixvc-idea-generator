// providers/notification-badge-provider.tsx
import type React from "react"
import { useNotificationBadge } from "@/hooks/use-notification-badge"

interface NotificationBadgeProviderProps {
  children: React.ReactNode
}

export function NotificationBadgeProvider({ children }: NotificationBadgeProviderProps) {
  const { count, setCount } = useNotificationBadge()

  return <div>{children}</div>
}
