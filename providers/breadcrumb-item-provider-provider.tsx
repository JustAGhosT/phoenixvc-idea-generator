// providers/breadcrumb-item-provider-provider.tsx
import type React from "react"
import { useBreadcrumbItem } from "@/hooks/use-breadcrumb-item"

interface BreadcrumbItemProviderProps {
  children: React.ReactNode
  id: string
}

export function BreadcrumbItemProvider({ children, id }: BreadcrumbItemProviderProps) {
  const { breadcrumb, loading, error } = useBreadcrumbItem(id)

  return <div>{children}</div>
}
