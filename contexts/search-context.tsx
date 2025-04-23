"use client"

import { useDebounce } from "@/hooks/use-debounce"
import { ideas } from "@/lib/data"
import { useRouter } from "next/navigation"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type SearchResult = {
  id: string | number
  title: string
  type: "project" | "idea" | "template" | "document"
  description?: string
  url: string
  lastAccessed?: Date
}

type SearchContextType = {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchResults: SearchResult[]
  isLoading: boolean
  recentSearches: SearchResult[]
  addRecentSearch: (result: SearchResult) => void
  clearRecentSearches: () => void
  isSearchOpen: boolean
  toggleSearch: () => void
  openSearch: () => void
  closeSearch: () => void
  performSearch: (term?: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Export both names for compatibility
export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

export const useSearchContext = useSearch;
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const router = useRouter()

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
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
    }
  }, [recentSearches])

  const performSearch = async (term?: string) => {
    const searchFor = term !== undefined ? term : debouncedSearchTerm

    if (!searchFor || searchFor.length < 2) {
      setSearchResults([])
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate with the ideas data
      const results: SearchResult[] = ideas
        .filter(
          (idea) =>
            idea.title.toLowerCase().includes(searchFor.toLowerCase()) ||
            idea.keyDifferentiator.toLowerCase().includes(searchFor.toLowerCase()),
        )
        .map((idea) => ({
          id: idea.id,
          title: idea.title,
          type: "idea",
          description: idea.keyDifferentiator,
          url: `/editor/${idea.id}`,
        }))

      if ("template".includes(searchFor.toLowerCase())) {
        results.push({
          id: "template-1",
          title: "DeFi Project Analysis Template",
          type: "template",
          description: "Comprehensive analysis framework for DeFi projects",
          url: "/templates",
        })
      }

      if ("document".includes(searchFor.toLowerCase()) || "whitepaper".includes(searchFor.toLowerCase())) {
        results.push({
          id: "doc-1",
          title: "Risk Assessment Whitepaper",
          type: "document",
          description: "Technical documentation on risk assessment methodologies",
          url: "/analysis-history",
        })
      }

      setSearchResults(results)
    } catch (error) {
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
