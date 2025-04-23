// providers/breadcrumb-provider-provider.tsx
import type React from "react"
import { useBreadcrumbProvider } from "@/hooks/use-breadcrumb-provider"

interface BreadcrumbProviderProviderProps {
  children: React.ReactNode
}

export function BreadcrumbProviderProvider({ children }: BreadcrumbProviderProviderProps) {
  const {} = useBreadcrumbProvider()

  return <div>{children}</div>
}
