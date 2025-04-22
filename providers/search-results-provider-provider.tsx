// providers/search-results-provider-provider.tsx
import type React from "react"
import { useSearchResults } from "@/hooks/use-search-results"

interface SearchResultsProviderProps {
  children: React.ReactNode
  term: string
}

export function SearchResultsProvider({ children, term }: SearchResultsProviderProps) {
  const { results, loading, error } = useSearchResults(term)

  return <div>{children}</div>
}
