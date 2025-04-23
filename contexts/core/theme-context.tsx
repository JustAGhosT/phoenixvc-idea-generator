"use client"

import { themeService } from "@/lib/theme-service"
import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}

// For backward compatibility
export const useTheme = useThemeContext

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true)
      try {
        // First try to get from localStorage
        const savedTheme = localStorage.getItem(storageKey) as Theme | null
        
        if (savedTheme) {
          setTheme(savedTheme)
        } else {
          // If not in localStorage, try to get from service
          const serviceTheme = await themeService.getTheme()
          setTheme(serviceTheme as Theme)
        }
      } catch (error) {
        console.error("Failed to load theme:", error)
        // Fallback to default theme
        setTheme(defaultTheme)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadTheme()
  }, [defaultTheme, storageKey])

  useEffect(() => {
    // Save to localStorage when theme changes
    localStorage.setItem(storageKey, theme)
    
    // Apply theme to document
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme,
    isLoading
  }

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}