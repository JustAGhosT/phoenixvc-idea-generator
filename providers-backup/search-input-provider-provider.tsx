// providers/search-input-provider-provider.tsx
import type React from "react"
import { useSearchInput } from "@/hooks/use-search-input"

interface SearchInputProviderProps {
  children: React.ReactNode
}

export function SearchInputProvider({ children }: SearchInputProviderProps) {
  const { term, handleChange } = useSearchInput()

  return <div>{children}</div>
}
