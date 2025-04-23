"use client"

// hooks/use-theme-service.ts
import { useState, useEffect } from "react"
import { themeService } from "@/lib/theme-service"

export function useThemeService() {
  const [theme, setTheme] = useState("light")
  const [loading, setLoading] = useState(true)

  const fetchTheme = async () => {
    setLoading(true)
    try {
      const data = await themeService.getTheme()
      setTheme(data)
    } catch (error) {
      console.error("Error fetching theme:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTheme()
  }, [])

  return { theme, loading, fetchTheme }
}
