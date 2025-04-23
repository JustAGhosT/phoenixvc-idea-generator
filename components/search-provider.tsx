"use client"

// This file re-exports the search context from the contexts folder
// It's here to maintain backward compatibility with existing imports

import { SearchProvider as OriginalSearchProvider, useSearch, useSearchContext } from "@/contexts/search-context"

export { useSearch, useSearchContext }
export const SearchProvider = OriginalSearchProvider
