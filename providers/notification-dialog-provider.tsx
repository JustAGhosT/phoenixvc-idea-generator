// providers/notification-dialog-provider.tsx
import type React from "react"
import { useNotificationDialog } from "@/hooks/use-notification-dialog"

interface NotificationDialogProps {
  children: React.ReactNode
}

export function NotificationDialogProvider({ children }: NotificationDialogProps) {
  const { isOpen, openDialog, closeDialog } = useNotificationDialog()

  return <div>{children}</div>
}
