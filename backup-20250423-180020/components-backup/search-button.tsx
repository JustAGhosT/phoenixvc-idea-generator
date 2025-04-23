"use client"

// components/search-button.tsx
interface SearchButtonProps {
  onClick: () => void
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return <button onClick={onClick}>Search</button>
}
