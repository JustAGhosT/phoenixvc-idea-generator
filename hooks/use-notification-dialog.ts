"use client"

// hooks/use-notification-dialog.ts
import { useState } from "react"

export function useNotificationDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return { isOpen, openDialog, closeDialog }
}
