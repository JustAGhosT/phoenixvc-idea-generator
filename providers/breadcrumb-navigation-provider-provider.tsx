// providers/breadcrumb-navigation-provider-provider.tsx
import type React from "react"
import { useBreadcrumbNavigation } from "@/hooks/use-breadcrumb-navigation"

interface BreadcrumbNavigationProviderProps {
  children: React.ReactNode
}

export function BreadcrumbNavigationProvider({ children }: BreadcrumbNavigationProviderProps) {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbNavigation()

  return <div>{children}</div>
}
