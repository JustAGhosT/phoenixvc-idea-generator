"use client"

import { breadcrumbService } from "@/lib/breadcrumb-service"
import { Breadcrumb } from "@/lib/types"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export function useBreadcrumbService() {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const pathname = usePathname()

  const fetchBreadcrumbs = useCallback(async (path: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await breadcrumbService.getBreadcrumbs(path)
      setBreadcrumbs(data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Error fetching breadcrumbs")
      setError(error)
      console.error("Error fetching breadcrumbs:", err)
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchBreadcrumbs(pathname)
  }, [pathname, fetchBreadcrumbs])
  return { breadcrumbs, loading, error, fetchBreadcrumbs }
}
