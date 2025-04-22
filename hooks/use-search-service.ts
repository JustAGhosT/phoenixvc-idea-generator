"use client"

// hooks/use-search-service.ts
import { useState } from "react"
import { searchService } from "@/lib/search-service"

export function useSearchService() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const search = async (term: string) => {
    setLoading(true)
    try {
      const data = await searchService.search(term)
      setResults(data)
    } catch (error) {
      console.error("Error performing search:", error)
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, search }
}
