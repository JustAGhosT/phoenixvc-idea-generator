// providers/search-context-provider-provider.tsx
import type React from "react"
import { useSearchContext } from "@/hooks/use-search-provider"

interface SearchContextProviderProps {
  children: React.ReactNode
}

export function SearchContextProvider({ children }: SearchContextProviderProps) {
  const {} = useSearchContext()

  return <div>{children}</div>
}
