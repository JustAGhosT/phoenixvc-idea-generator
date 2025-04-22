// app/search/results/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { SearchResult } from "@/components/search-result"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const term = searchParams.get("term")

  return (
    <div>
      <h2>Search Results for "{term}"</h2>
      <SearchResult term={term || ""} />
    </div>
  )
}
