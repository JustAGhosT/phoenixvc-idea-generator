"use client"

// hooks/use-theme-list.ts
import { useState, useEffect } from "react"

export function useThemeList() {
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching themes
        setTimeout(() => {
          setThemes([
            { id: "1", name: "Theme 1" },
            { id: "2", name: "Theme 2" },
          ])
        }, 500)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { themes, loading, error }
}
