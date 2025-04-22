"use client"

// hooks/use-breadcrumb-api.ts
import { useState, useEffect } from "react"

export function useBreadcrumbApi(path: string) {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/breadcrumbs?path=${path}`)
        if (!response.ok) {
          throw new Error("Failed to fetch breadcrumbs")
        }
        const data = await response.json()
        setBreadcrumbs(data)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    if (path) {
      fetchData()
    }
  }, [path])

  return { breadcrumbs, loading, error }
}
