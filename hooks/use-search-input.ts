"use client"

import type React from "react"

// hooks/use-search-input.ts
import { useState } from "react"

export function useSearchInput() {
  const [term, setTerm] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value)
  }

  return { term, handleChange }
}
