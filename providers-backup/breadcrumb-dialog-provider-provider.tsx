// providers/breadcrumb-dialog-provider-provider.tsx
import type React from "react"
import { useBreadcrumbDialog } from "@/hooks/use-breadcrumb-dialog"

interface BreadcrumbDialogProviderProps {
  children: React.ReactNode
}

export function BreadcrumbDialogProvider({ children }: BreadcrumbDialogProviderProps) {
  const { isOpen, openDialog, closeDialog } = useBreadcrumbDialog()

  return <div>{children}</div>
}
