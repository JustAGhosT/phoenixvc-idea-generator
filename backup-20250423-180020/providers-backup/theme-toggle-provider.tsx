// providers/theme-toggle-provider.tsx
import type React from "react"
import { useThemeToggle } from "@/hooks/use-theme-toggle"

interface ThemeToggleProviderProps {
  children: React.ReactNode
}

export function ThemeToggleProvider({ children }: ThemeToggleProviderProps) {
  const { isDark, toggleTheme } = useThemeToggle()

  return <div>{children}</div>
}
