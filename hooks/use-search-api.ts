"use client"

// hooks/use-search-api.ts
import { useState, useEffect } from "react"

export function useSearchApi(term: string) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/search?term=${term}`)
        if (!response.ok) {
          throw new Error("Failed to fetch search results")
        }
        const data = await response.json()
        setResults(data)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    if (term) {
      fetchData()
    } else {
      setResults([])
    }
  }, [term])

  return { results, loading, error }
}
