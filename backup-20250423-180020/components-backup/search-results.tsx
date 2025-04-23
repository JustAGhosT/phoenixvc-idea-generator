// components/search-results.tsx
"use client"

import { useEffect, useState } from "react"

interface SearchResultsProps {
  term: string
}

export function SearchResults({ term }: SearchResultsProps) {
  const [results, setResults] = useState([])

  useEffect(() => {
    // Simulate fetching search results
    setTimeout(() => {
      setResults([
        { id: "1", title: `Result for ${term} 1` },
        { id: "2", title: `Result for ${term} 2` },
      ])
    }, 500)
  }, [term])

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  )
}
