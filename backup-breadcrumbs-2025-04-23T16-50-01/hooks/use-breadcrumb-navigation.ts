"use client"

// hooks/use-breadcrumb-navigation.ts
import { useState } from "react"

export function useBreadcrumbNavigation() {
  const [breadcrumbs, setBreadcrumbs] = useState([])

  return { breadcrumbs, setBreadcrumbs }
}
