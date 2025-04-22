"use client"

// hooks/use-search-results.ts
import { useState, useEffect } from "react"

export function useSearchResults(term: string) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching search results
        setTimeout(() => {
          setResults([
            { id: "1", title: `Result for ${term} 1` },
            { id: "2", title: `Result for ${term} 2` },
          ])
        }, 500)
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
