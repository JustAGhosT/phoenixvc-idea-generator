"use client"

import { useBreadcrumbs as useContextBreadcrumbs } from "@/contexts/features/breadcrumb-context"

/**
 * Hook for accessing and manipulating breadcrumbs
 * This is a wrapper around the context to provide a consistent API
 */
export function useBreadcrumbs() {
  return useContextBreadcrumbs()
}