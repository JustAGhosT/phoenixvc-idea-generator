"use client"

// hooks/use-breadcrumbs.ts
import { useContext } from "react"
import { BreadcrumbContext } from "@/components/breadcrumb-provider"

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider")
  }
  return context
}
