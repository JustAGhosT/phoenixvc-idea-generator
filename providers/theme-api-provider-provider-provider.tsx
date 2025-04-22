// providers/theme-api-provider-provider-provider.tsx
import type React from "react"
import { useThemeApi } from "@/hooks/use-theme-api"

interface ThemeApiProviderProps {
  children: React.ReactNode
}

export function ThemeApiProvider({ children }: ThemeApiProviderProps) {
  const { theme, loading, error } = useThemeApi()

  return <div>{children}</div>
}
