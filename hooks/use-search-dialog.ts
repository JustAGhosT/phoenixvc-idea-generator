"use client"

// hooks/use-search-dialog.ts
import { useState } from "react"

export function useSearchDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return { isOpen, openDialog, closeDialog }
}
