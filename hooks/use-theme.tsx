"use client"

import { Theme } from "@/lib/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  currentTheme: Theme
  themes: Theme[]
  setTheme: (themeId: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  isLoading: boolean
  error: Error | null
}

// Create a default theme
const defaultTheme: Theme = {
  id: "default",
  name: "Default Theme",
  colors: {
    primary: "#0070f3",
    secondary: "#7928ca",
    background: "#ffffff",
    text: "#000000",
  },
  isDark: false,
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  themes: [defaultTheme],
  setTheme: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  isLoading: false,
  error: null,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themes, setThemes] = useState<Theme[]>([defaultTheme])
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // Load themes on mount
  useEffect(() => {
    const loadThemes = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch themes from an API or local storage
        // For now, we'll just use some sample themes
        const sampleThemes: Theme[] = [
          defaultTheme,
          {
            id: "dark",
            name: "Dark Theme",
            colors: {
              primary: "#0070f3",
              secondary: "#7928ca",
              background: "#121212",
              text: "#ffffff",
            },
            isDark: true,
          },
          {
            id: "light",
            name: "Light Theme",
            colors: {
              primary: "#0070f3",
              secondary: "#7928ca",
              background: "#f7f7f7",
              text: "#000000",
            },
            isDark: false,
          },
        ]
        
        setThemes(sampleThemes)
        
        // Load saved theme preference
        const savedThemeId = localStorage.getItem("themeId") || "default"
        const savedTheme = sampleThemes.find(t => t.id === savedThemeId) || defaultTheme
        setCurrentTheme(savedTheme)
        setIsDarkMode(savedTheme.isDark)
        
        // Apply theme to document
        applyTheme(savedTheme)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load themes"))
        console.error("Error loading themes:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadThemes()
  }, [])
  
  // Apply theme to document
  const applyTheme = useCallback((theme: Theme) => {
    // Apply theme colors to CSS variables
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
    
    // Apply dark mode class
    if (theme.isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])
  
  // Set theme by ID
  const setTheme = useCallback((themeId: string) => {
    const theme = themes.find(t => t.id === themeId) || defaultTheme
    setCurrentTheme(theme)
    setIsDarkMode(theme.isDark)
    localStorage.setItem("themeId", theme.id)
    applyTheme(theme)
  }, [themes, applyTheme])
  
  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    
    // Find a theme that matches the new dark mode setting
    const matchingTheme = themes.find(t => t.isDark === newIsDarkMode) || 
      // Or create a modified version of the current theme
      {
        ...currentTheme,
        isDark: newIsDarkMode,
        colors: {
          ...currentTheme.colors,
          background: newIsDarkMode ? "#121212" : "#ffffff",
          text: newIsDarkMode ? "#ffffff" : "#000000",
        }
      }
    
    setCurrentTheme(matchingTheme)
    localStorage.setItem("themeId", matchingTheme.id)
    applyTheme(matchingTheme)
  }, [isDarkMode, themes, currentTheme, applyTheme])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themes,
      setTheme,
      isDarkMode,
      toggleDarkMode,
      isLoading,
      error,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook for accessing and managing the application theme
 * 
 * @example
 * ```tsx
 * const { currentTheme, setTheme, isDarkMode, toggleDarkMode } = useTheme()
 * 
 * return (
 *   <div>
 *     <p>Current theme: {currentTheme.name}</p>
 *     <button onClick={toggleDarkMode}>
 *       Toggle {isDarkMode ? "Light" : "Dark"} Mode
 *     </button>
 *     <select 
 *       value={currentTheme.id} 
 *       onChange={(e) => setTheme(e.target.value)}
 *     >
 *       {themes.map(theme => (
 *         <option key={theme.id} value={theme.id}>{theme.name}</option>
 *       ))}
 *     </select>
 *   </div>
 * )
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
