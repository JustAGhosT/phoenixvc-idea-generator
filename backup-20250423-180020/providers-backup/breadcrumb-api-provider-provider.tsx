// providers/breadcrumb-api-provider-provider.tsx
import type React from "react"
import { useBreadcrumbApi } from "@/hooks/use-breadcrumb-api"

interface BreadcrumbApiProviderProps {
  children: React.ReactNode
  path: string
}

export function BreadcrumbApiProvider({ children, path }: BreadcrumbApiProviderProps) {
  const { breadcrumbs, loading, error } = useBreadcrumbApi(path)

  return <div>{children}</div>
}
