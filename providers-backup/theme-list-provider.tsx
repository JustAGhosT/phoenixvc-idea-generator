// providers/theme-list-provider.tsx
import type React from "react"
import { useThemeList } from "@/hooks/use-theme-list"

interface ThemeListProviderProps {
  children: React.ReactNode
}

export function ThemeListProvider({ children }: ThemeListProviderProps) {
  const { themes, loading, error } = useThemeList()

  return <div>{children}</div>
}
