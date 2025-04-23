// providers/breadcrumb-context-provider-provider.tsx
import type React from "react"
import { useBreadcrumbContext } from "@/hooks/use-breadcrumb-provider"

interface BreadcrumbContextProviderProps {
  children: React.ReactNode
}

export function BreadcrumbContextProvider({ children }: BreadcrumbContextProviderProps) {
  const {} = useBreadcrumbContext()

  return <div>{children}</div>
}
