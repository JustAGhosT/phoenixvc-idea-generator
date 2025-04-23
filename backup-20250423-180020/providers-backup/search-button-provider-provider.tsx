// providers/search-button-provider-provider.tsx
import type React from "react"
import { useSearchButton } from "@/hooks/use-search-button"

interface SearchButtonProviderProps {
  children: React.ReactNode
}

export function SearchButtonProvider({ children }: SearchButtonProviderProps) {
  const { handleClick } = useSearchButton()

  return <div>{children}</div>
}
