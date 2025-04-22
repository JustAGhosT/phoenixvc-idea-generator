// providers/theme-context-provider-provider.tsx
import type React from "react"
import { useThemeContext } from "@/hooks/use-theme-provider"

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const {} = useThemeContext()

  return <div>{children}</div>
}
