// providers/notification-button-provider.tsx
import type React from "react"
import { useNotificationButton } from "@/hooks/use-notification-button"

interface NotificationButtonProviderProps {
  children: React.ReactNode
}

export function NotificationButtonProvider({ children }: NotificationButtonProviderProps) {
  const { handleClick } = useNotificationButton()

  return <div>{children}</div>
}
