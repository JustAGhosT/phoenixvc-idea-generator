// providers/search-result-provider.tsx
import type React from "react"
import { useSearchResult } from "@/hooks/use-search-result"

interface SearchResultProviderProps {
  children: React.ReactNode
  term: string
}

export function SearchResultProvider({ children, term }: SearchResultProviderProps) {
  const { result, loading, error } = useSearchResult(term)

  return <div>{children}</div>
}
