// providers/theme-item-provider.tsx
import type React from "react"
import { useThemeItem } from "@/hooks/use-theme-item"

interface ThemeItemProviderProps {
  children: React.ReactNode
  id: string
}

export function ThemeItemProvider({ children, id }: ThemeItemProviderProps) {
  const { theme, loading, error } = useThemeItem(id)

  return <div>{children}</div>
}
