"use client"

// hooks/use-breadcrumb-service.ts
import { useState, useEffect } from "react"
import { breadcrumbService } from "@/lib/breadcrumb-service"
import { usePathname } from "next/navigation"

export function useBreadcrumbService() {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const fetchBreadcrumbs = async (path: string) => {
    setLoading(true)
    try {
      const data = await breadcrumbService.getBreadcrumbs(path)
      setBreadcrumbs(data)
    } catch (error) {
      console.error("Error fetching breadcrumbs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBreadcrumbs(pathname)
  }, [pathname])

  return { breadcrumbs, loading, fetchBreadcrumbs }
}
