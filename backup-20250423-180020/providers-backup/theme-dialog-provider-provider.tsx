// providers/theme-dialog-provider-provider.tsx
import type React from "react"
import { useThemeDialog } from "@/hooks/use-theme-dialog"

interface ThemeDialogProviderProps {
  children: React.ReactNode
}

export function ThemeDialogProvider({ children }: ThemeDialogProviderProps) {
  const { isOpen, openDialog, closeDialog } = useThemeDialog()

  return <div>{children}</div>
}
