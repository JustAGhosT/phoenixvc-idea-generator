// providers/theme-service-provider-provider.tsx
import type React from "react"
import { useThemeService } from "@/hooks/use-theme-service"

interface ThemeServiceProviderProps {
  children: React.ReactNode
}

export function ThemeServiceProvider({ children }: ThemeServiceProviderProps) {
  const { theme, loading, fetchTheme } = useThemeService()

  return <div>{children}</div>
}
