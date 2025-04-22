"use client"

// hooks/use-theme-dialog.ts
import { useState } from "react"

export function useThemeDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return { isOpen, openDialog, closeDialog }
}
