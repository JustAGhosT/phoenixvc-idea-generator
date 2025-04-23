"use client"

import { breadcrumbService } from "@/lib/breadcrumb-service"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function useBreadcrumbService() {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const pathname = usePathname()

  const fetchBreadcrumbs = useCallback(async (path: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await breadcrumbService.getBreadcrumbs(path)
      setBreadcrumbs(data)
    } catch (err) {
      setError(err)
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
