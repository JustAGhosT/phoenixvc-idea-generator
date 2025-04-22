// providers/notification-context-provider-provider-provider.tsx
import type React from "react"
import { useNotificationContext } from "@/hooks/use-notification-provider"

interface NotificationContextProviderProps {
  children: React.ReactNode
}

export function NotificationContextProvider({ children }: NotificationContextProviderProps) {
  const {} = useNotificationContext()

  return <div>{children}</div>
}
