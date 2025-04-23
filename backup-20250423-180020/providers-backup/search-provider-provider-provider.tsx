// providers/search-provider-provider-provider.tsx
import type React from "react"
import { useSearchProvider } from "@/hooks/use-search-provider"

interface SearchProviderProviderProps {
  children: React.ReactNode
}

export function SearchProviderProvider({ children }: SearchProviderProviderProps) {
  const {} = useSearchProvider()

  return <div>{children}</div>
}
