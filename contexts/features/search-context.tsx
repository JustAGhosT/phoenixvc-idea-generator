"use client"

import { useDebounce } from "@/hooks/use-debounce"
import { searchService } from "@/lib/search-service"
import React, { createContext, useContext, useEffect, useState } from "react"

export type SearchResult = {
  id: string | number
  title: string
  type: "project" | "idea" | "template" | "document"
  description?: string
  url: string
  lastAccessed?: Date
}

interface SearchContextProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchResults: SearchResult[]
  isLoading: boolean
  error: Error | null
  recentSearches: SearchResult[]
  addRecentSearch: (result: SearchResult) => void
  clearRecentSearches: () => void
  isSearchOpen: boolean
  toggleSearch: () => void
  openSearch: () => void
  closeSearch: () => void
  performSearch: (term?: string) => Promise<void>
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider")
  }
  return context
}

// Alias for backward compatibility
export const useSearch = useSearchContext

interface SearchProviderProps {
  children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches)
        // Convert string dates back to Date objects
        const withDates = parsed.map((item: any) => ({
          ...item,
          lastAccessed: item.lastAccessed ? new Date(item.lastAccessed) : new Date(),
        }))
        setRecentSearches(withDates)
      } catch (e) {
        console.error("Failed to parse recent searches", e)
      }
    }
  }, [])

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
    } else {
      localStorage.removeItem("recentSearches")
    }
  }, [recentSearches])

  const performSearch = async (term?: string) => {
    const searchFor = term !== undefined ? term : debouncedSearchTerm

    if (!searchFor || searchFor.length < 2) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const results = await searchService.search(searchFor)
      setSearchResults(results)
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Search failed")
      setError(error)
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Perform search when debounced term changes
  useEffect(() => {
    performSearch()
  }, [debouncedSearchTerm])

  const addRecentSearch = (result: SearchResult) => {
    setRecentSearches((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => !(item.id === result.id && item.type === result.type))

      // Add to the beginning with current timestamp
      const newItem = {
        ...result,
        lastAccessed: new Date(),
      }

      // Keep only the 10 most recent
      return [newItem, ...filtered].slice(0, 10)
    })
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        isLoading,
        error,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isSearchOpen,
        toggleSearch,
        openSearch,
        closeSearch,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}