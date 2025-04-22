// app/search/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const term = searchParams.get("term")

  return (
    <div>
      <h1>Search Results for "{term}"</h1>
      <SearchResults term={term || ""} />
    </div>
  )
}
