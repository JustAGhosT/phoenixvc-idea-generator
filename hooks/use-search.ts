"use client"

// hooks/use-search.ts
import { useContext } from "react"
import { SearchContext } from "@/components/search-provider"

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
