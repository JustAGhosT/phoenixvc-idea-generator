// providers/theme-provider-provider.tsx
import type React from "react"
import { useThemeProvider } from "@/hooks/use-theme-provider"

interface ThemeProviderProviderProps {
  children: React.ReactNode
}

export function ThemeProviderProvider({ children }: ThemeProviderProviderProps) {
  const {} = useThemeProvider()

  return <div>{children}</div>
}
