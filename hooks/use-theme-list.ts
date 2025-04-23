"use client"

// hooks/use-theme-list.ts
import { useCallback } from "react"
import { useTheme } from "./use-theme"

/**
 * Hook for accessing and managing the list of available themes
 * 
 * @example
 * ```tsx
 * const { themes, currentThemeId, setTheme, isLoading, error } = useThemeList()
 * 
 * if (isLoading) return <Spinner />
 * if (error) return <ErrorMessage error={error} />
 * 
 * return (
 *   <div>
 *     <h2>Available Themes</h2>
 *     <div className="theme-grid">
 *       {themes.map(theme => (
 *         <ThemeCard 
 *           key={theme.id}
 *           theme={theme}
 *           isActive={theme.id === currentThemeId}
 *           onSelect={() => setTheme(theme.id)}
 *         />
 *       ))}
 *     </div>
 *   </div>
 * )
 * ```
 */
export function useThemeList() {
  const { themes, currentTheme, setTheme, isLoading, error } = useTheme()
  
  const currentThemeId = currentTheme.id
  
  const handleThemeChange = useCallback((themeId: string) => {
    setTheme(themeId)
  }, [setTheme])

  return {
    themes,
    currentThemeId,
    setTheme: handleThemeChange,
    isLoading,
    error
  }
}
