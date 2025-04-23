"use client"

// hooks/use-breadcrumb-dialog.ts
import { useState } from "react"

export function useBreadcrumbDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return { isOpen, openDialog, closeDialog }
}
