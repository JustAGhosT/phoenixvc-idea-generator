// hooks/use-breadcrumb-provider.ts
import { useBreadcrumbContext } from "@/components/breadcrumb-provider"

export function useBreadcrumbProvider() {
  return useBreadcrumbContext()
}
