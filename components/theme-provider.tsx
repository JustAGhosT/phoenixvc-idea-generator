"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface ThemeContextProps {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("light")

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContext }
