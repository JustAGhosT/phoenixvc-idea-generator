// providers/breadcrumb-service-provider.tsx
import type React from "react"
import { useBreadcrumbService } from "@/hooks/use-breadcrumb-service"

interface BreadcrumbServiceProviderProps {
  children: React.ReactNode
}

export function BreadcrumbServiceProvider({ children }: BreadcrumbServiceProviderProps) {
  const { breadcrumbs, loading, fetchBreadcrumbs } = useBreadcrumbService()

  return <div>{children}</div>
}
