// providers/search-api-provider-provider.tsx
import type React from "react"
import { useSearchApi } from "@/hooks/use-search-api"

interface SearchApiProviderProps {
  children: React.ReactNode
  term: string
}

export function SearchApiProvider({ children, term }: SearchApiProviderProps) {
  const { results, loading, error } = useSearchApi(term)

  return <div>{children}</div>
}
