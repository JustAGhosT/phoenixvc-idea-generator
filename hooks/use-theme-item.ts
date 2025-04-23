"use client"

import { Theme } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"
import { useTheme } from "./use-theme"

/**
 * Hook for managing a single theme
 * 
 * @example
 * ```tsx
 * const { theme, loading, error, setAsActive } = useThemeItem("dark")
 * 
 * if (loading) return <Spinner />
 * if (error) return <ErrorMessage error={error} />
 * if (!theme) return <NotFound />
 * 
 * return (
 *   <div>
 *     <h2>{theme.name}</h2>
 *     <Button onClick={setAsActive}>Use This Theme</Button>
 *     <div className="color-preview">
 *       {Object.entries(theme.colors).map(([name, color]) => (
 *         <div 
 *           key={name} 
 *           style={{ backgroundColor: color }}
 *           className="color-swatch"
 *         >
 *           {name}: {color}
 *         </div>
 *       ))}
 *     </div>
 *   </div>
 * )
 * ```
 */
export function useThemeItem(themeId: string) {
  const { themes, setTheme, currentTheme } = useTheme()
  const [theme, setThemeState] = useState<Theme | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadTheme = async () => {
      setLoading(true)
      setError(null)
      try {
        // Find theme in available themes
        const foundTheme = themes.find(t => t.id === themeId)
        if (foundTheme) {
          setThemeState(foundTheme)
        } else {
          throw new Error(`Theme with ID ${themeId} not found`)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Failed to load theme ${themeId}`))
        console.error(`Error loading theme ${themeId}:`, err)
      } finally {
        setLoading(false)
      }
    }

    loadTheme()
  }, [themeId, themes])

  const setAsActive = useCallback(() => {
    if (theme) {
      setTheme(theme.id)
    }
  }, [theme, setTheme])

  const isActive = currentTheme.id === themeId

  return {
    theme,
    loading,
    error,
    setAsActive,
    isActive
  }
}