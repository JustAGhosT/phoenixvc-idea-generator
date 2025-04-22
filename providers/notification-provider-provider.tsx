// providers/notification-provider-provider.tsx
import type React from "react"
import { useNotificationProvider } from "@/hooks/use-notification-provider"

interface NotificationProviderProviderProps {
  children: React.ReactNode
}

export function NotificationProviderProvider({ children }: NotificationProviderProviderProps) {
  const {} = useNotificationProvider()

  return <div>{children}</div>
}
