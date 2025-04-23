"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  SearchIcon,
  FileText,
  FileCode,
  Clock,
  X,
  Loader2,
  BarChart3,
  FileBarChart,
  PlusCircle,
  AlertTriangle,
} from "lucide-react"
import { useSearch, type SearchResult } from "@/contexts/search-context"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

export function Search() {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    isSearchOpen,
    setIsSearchOpen,
  } = useSearch()

  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close search dropdown when clicking outside
  useOnClickOutside(searchRef, () => setIsSearchOpen(false))

  // Focus input when search is opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchItemClick = (result: SearchResult) => {
    addRecentSearch(result)
    setIsSearchOpen(false)
    setSearchTerm("")
    router.push(result.url)
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "idea":
        return <BarChart3 className="h-4 w-4 mr-2" />
      case "template":
        return <FileText className="h-4 w-4 mr-2" />
      case "document":
        return <FileCode className="h-4 w-4 mr-2" />
      default:
        return <FileBarChart className="h-4 w-4 mr-2" />
    }
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search projects, ideas, templates..."
          className="w-full bg-background pl-8 pr-10 md:w-[300px] lg:w-[400px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => {
              setSearchTerm("")
              inputRef.current?.focus()
            }}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border bg-popover shadow-md animate-fade-in">
          <Command className="w-full">
            <CommandInput
              placeholder="Search projects, ideas, templates..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="border-none focus:ring-0"
            />
            <CommandList className="max-h-[300px] overflow-auto search-results-scrollbar">
              {isLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              )}

              {!isLoading && searchTerm.length > 0 && searchResults.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {searchTerm.length > 0 && searchResults.length > 0 && (
                <CommandGroup heading="Search Results">
                  {searchResults.map((result) => (
                    <CommandItem
                      key={`${result.type}-${result.id}`}
                      onSelect={() => handleSearchItemClick(result)}
                      className="flex items-center cursor-pointer"
                    >
                      {getIconForType(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground line-clamp-1">{result.description}</div>
                        )}
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground capitalize">{result.type}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchTerm.length === 0 && recentSearches.length > 0 && (
                <>
                  <CommandGroup heading="Recent Searches">
                    {recentSearches
                      .sort((a, b) => b.lastAccessed!.getTime() - a.lastAccessed!.getTime())
                      .slice(0, 5)
                      .map((result) => (
                        <CommandItem
                          key={`recent-${result.type}-${result.id}`}
                          onSelect={() => handleSearchItemClick(result)}
                          className="flex items-center cursor-pointer"
                        >
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{result.title}</div>
                            {result.description && (
                              <div className="text-xs text-muted-foreground line-clamp-1">{result.description}</div>
                            )}
                          </div>
                          <span className="ml-auto text-xs text-muted-foreground capitalize">{result.type}</span>
                        </CommandItem>
                      ))}
                    <CommandItem
                      onSelect={clearRecentSearches}
                      className="justify-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      Clear recent searches
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandGroup heading="Quick Actions">
                <CommandItem onSelect={() => router.push("/editor/new")} className="flex items-center cursor-pointer">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span>Create New Project</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => router.push("/risk-analysis")}
                  className="flex items-center cursor-pointer"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Risk Analysis</span>
                </CommandItem>
                <CommandItem onSelect={() => router.push("/compare")} className="flex items-center cursor-pointer">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>Compare Projects</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
