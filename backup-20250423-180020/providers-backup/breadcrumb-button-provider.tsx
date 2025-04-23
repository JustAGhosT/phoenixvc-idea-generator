// providers/breadcrumb-button-provider.tsx
import type React from "react"
import { useBreadcrumbButton } from "@/hooks/use-breadcrumb-button"

interface BreadcrumbButtonProviderProps {
  children: React.ReactNode
}

export function BreadcrumbButtonProvider({ children }: BreadcrumbButtonProviderProps) {
  const { handleClick } = useBreadcrumbButton()

  return <div>{children}</div>
}
