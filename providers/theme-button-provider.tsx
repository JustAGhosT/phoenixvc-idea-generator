// providers/theme-button-provider.tsx
import type React from "react"
import { useThemeButton } from "@/hooks/use-theme-button"

interface ThemeButtonProviderProps {
  children: React.ReactNode
}

export function ThemeButtonProvider({ children }: ThemeButtonProviderProps) {
  const { handleClick } = useThemeButton()

  return <div>{children}</div>
}
