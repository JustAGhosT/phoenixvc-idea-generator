"use client"

import { searchService } from "@/lib/search-service"
import type { SearchResult } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "../src/hooks/use-debounce"
import { useResourceList } from "./use-resource-list"

/**
 * Hook for searching and accessing search results
 * 
 * @example
 * ```tsx
 * const { results, loading, error, search } = useSearchResults()
 * 
 * return (
 *   <div>
 *     <SearchInput onSearch={search} />
 *     {loading && <SearchSkeleton />}
 *     {error && <ErrorMessage error={error} />}
 *     <SearchResultsList results={results} />
 *   </div>
 * )
 * ```
 */
export function useSearchResults(initialTerm: string = "") {
  const [term, setTerm] = useState<string>(initialTerm)
  const debouncedTerm = useDebounce(term, 300)

  const fetchResults = useCallback(async () => {
    if (!debouncedTerm) return []
    return await searchService.search(debouncedTerm)
  }, [debouncedTerm])

  const result = useResourceList<SearchResult>({
    fetchFn: fetchResults,
    autoFetch: !!debouncedTerm,
    errorContext: "search-results"
  })

  // Refetch when debounced term changes
  useEffect(() => {
    if (debouncedTerm) {
      result.refetch()
    }
  }, [debouncedTerm, result.refetch])

  const search = useCallback((newTerm: string) => {
    setTerm(newTerm)
  }, [])

  return {
    results: result.data,
    loading: result.loading,
    error: result.error,
    search,
    term,
    setTerm
  }
}
