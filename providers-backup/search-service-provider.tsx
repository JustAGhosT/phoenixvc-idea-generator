// providers/search-service-provider.tsx
import type React from "react"
import { useSearchService } from "@/hooks/use-search-service"

interface SearchServiceProviderProps {
  children: React.ReactNode
}

export function SearchServiceProvider({ children }: SearchServiceProviderProps) {
  const { results, loading, search } = useSearchService()

  return <div>{children}</div>
}
