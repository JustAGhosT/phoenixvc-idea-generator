"use client"

import { searchService } from "@/lib/search-service"
import { SearchResult } from "@/lib/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useDebounce } from "../src/hooks/use-debounce"

interface SearchContextType {
  query: string
  setQuery: (query: string) => void
  results: SearchResult[]
  isLoading: boolean
  error: Error | null
  search: (query: string) => Promise<SearchResult[]>
  clearResults: () => void
  recentSearches: string[]
  clearRecentSearches: () => void
}

// Create the context with a default value and export it
export const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  
  const debouncedQuery = useDebounce(query, 300)
  
  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSearches = localStorage.getItem("recentSearches")
      if (savedSearches) {
        try {
          setRecentSearches(JSON.parse(savedSearches))
        } catch (err) {
          console.error("Error parsing recent searches:", err)
          localStorage.removeItem("recentSearches")
        }
      }
    }
  }, [])

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
    }
  }, [recentSearches])
  
  // Search function
  const search = useCallback(async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery.trim()) {
      setResults([])
      return []
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const searchResults = await searchService.search(searchQuery)
      setResults(searchResults)
      
      // Add to recent searches if not already there
      if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev].slice(0, 10))
      }
      
      return searchResults
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Search failed")
      setError(error)
      console.error("Search error:", err)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [recentSearches])
  
  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      const performSearch = async () => {
        if (!debouncedQuery.trim()) {
          setResults([])
          return
        }
        
        setIsLoading(true)
        setError(null)
        
        try {
          const searchResults = await searchService.search(debouncedQuery)
          setResults(searchResults)
          
          // Add to recent searches if not already there
          if (debouncedQuery.trim() && !recentSearches.includes(debouncedQuery)) {
            setRecentSearches(prev => [debouncedQuery, ...prev].slice(0, 10))
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error("Search failed")
          setError(error)
          console.error("Search error:", err)
        } finally {
          setIsLoading(false)
        }
      }
      
      performSearch()
    } else {
      setResults([])
    }
  }, [debouncedQuery, recentSearches])
  
  // Clear results
  const clearResults = useCallback(() => {
    setResults([])
    setQuery("")
  }, [])

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem("recentSearches")
    }
  }, [])

  const contextValue: SearchContextType = {
    query,
    setQuery,
    results,
    isLoading,
    error,
    search,
    clearResults,
    recentSearches,
    clearRecentSearches
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}

/**
 * Hook for accessing and using the search functionality
 * 
 * @example
 * ```tsx
 * const { 
 *   query, 
 *   setQuery, 
 *   results, 
 *   isLoading, 
 *   error,
 *   recentSearches
 * } = useSearch()
 * 
 * return (
 *   <div>
 *     <SearchInput 
 *       value={query} 
 *       onChange={(e) => setQuery(e.target.value)} 
 *     />
 *     
 *     {isLoading && <SearchSkeleton />}
 *     {error && <ErrorMessage error={error} />}
 *     
 *     <SearchResults results={results} />
 *     
 *     {query === "" && recentSearches.length > 0 && (
 *       <RecentSearches 
 *         searches={recentSearches} 
 *         onSelect={setQuery}
 *       />
 *     )}
 *   </div>
 * )
 * ```
 */
export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}