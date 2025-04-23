// providers/breadcrumb-list-provider-provider-provider.tsx
import type React from "react"
import { useBreadcrumbList } from "@/hooks/use-breadcrumb-list"

interface BreadcrumbListProviderProps {
  children: React.ReactNode
}

export function BreadcrumbListProvider({ children }: BreadcrumbListProviderProps) {
  const { breadcrumbs, loading, error } = useBreadcrumbList()

  return <div>{children}</div>
}
