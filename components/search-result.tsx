// components/search-result.tsx
"use client"

import { useEffect, useState } from "react"

interface SearchResultProps {
  term: string
}

export function SearchResult({ term }: SearchResultProps) {
  const [result, setResult] = useState(null)

  useEffect(() => {
    // Simulate fetching a search result
    setTimeout(() => {
      setResult({ id: "1", title: `Single Result for ${term}` })
    }, 500)
  }, [term])

  return <div>{result ? result.title : "Loading..."}</div>
}
