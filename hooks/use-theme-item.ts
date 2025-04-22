"use client"

// hooks/use-theme-item.ts
import { useState, useEffect } from "react"

export function useThemeItem(id: string) {
  const [theme, setTheme] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching a theme
        setTimeout(() => {
          setTheme({ id, name: `Theme with ID ${id}` })
        }, 500)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { theme, loading, error }
}
