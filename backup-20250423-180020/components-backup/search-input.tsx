// components/search-input.tsx
"use client"

import type React from "react"

import { useState } from "react"

interface SearchInputProps {
  onSearch: (term: string) => void
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [term, setTerm] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(term)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={term} onChange={handleChange} placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  )
}
