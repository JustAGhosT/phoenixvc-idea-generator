// providers/breadcrumb-dialog-provider.tsx
import type React from "react"
import { useBreadcrumbDialog } from "@/hooks/use-breadcrumb-dialog"

interface BreadcrumbDialogProps {
  children: React.ReactNode
}

export function BreadcrumbDialogProvider({ children }: BreadcrumbDialogProps) {
  const { isOpen, openDialog, closeDialog } = useBreadcrumbDialog()

  return <div>{children}</div>
}
