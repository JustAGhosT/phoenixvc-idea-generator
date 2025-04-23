// providers/notification-dialog-provider-provider.tsx
import type React from "react"
import { useNotificationDialog } from "@/hooks/use-notification-dialog"

interface NotificationDialogProviderProps {
  children: React.ReactNode
}

export function NotificationDialogProvider({ children }: NotificationDialogProviderProps) {
  const { isOpen, openDialog, closeDialog } = useNotificationDialog()

  return <div>{children}</div>
}
