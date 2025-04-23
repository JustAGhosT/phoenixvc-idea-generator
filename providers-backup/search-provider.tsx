// providers/search-provider.tsx
"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface SearchContextProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider")
  }
  return context
}

interface SearchProviderProps {
  children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  return <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>{children}</SearchContext.Provider>
}
