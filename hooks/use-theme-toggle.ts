"use client"

// hooks/use-theme-toggle.ts
import { useState } from "react"

export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return { isDark, toggleTheme }
}
