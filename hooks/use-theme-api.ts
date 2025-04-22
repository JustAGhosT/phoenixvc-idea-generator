"use client"

// hooks/use-theme-api.ts
import { useState, useEffect } from "react"

export function useThemeApi() {
  const [theme, setTheme] = useState("light")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/theme`)
        if (!response.ok) {
          throw new Error("Failed to fetch theme")
        }
        const data = await response.json()
        setTheme(data.theme)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { theme, loading, error }
}
