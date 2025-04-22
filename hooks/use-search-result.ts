"use client"

// hooks/use-search-result.ts
import { useState, useEffect } from "react"

export function useSearchResult(term: string) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching a search result
        setTimeout(() => {
          setResult({ id: "1", title: `Single Result for ${term}` })
        }, 500)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    if (term) {
      fetchData()
    }
  }, [term])

  return { result, loading, error }
}
