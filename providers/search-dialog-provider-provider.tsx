// providers/search-dialog-provider-provider.tsx
import type React from "react"
import { useSearchDialog } from "@/hooks/use-search-dialog"

interface SearchDialogProviderProps {
  children: React.ReactNode
}

export function SearchDialogProvider({ children }: SearchDialogProviderProps) {
  const { isOpen, openDialog, closeDialog } = useSearchDialog()

  return <div>{children}</div>
}
