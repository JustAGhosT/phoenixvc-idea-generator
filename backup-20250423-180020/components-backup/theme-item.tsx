// components/theme-item.tsx
"use client"

import { useEffect, useState } from "react"

interface ThemeItemProps {
  id: string
}

export function ThemeItem({ id }: ThemeItemProps) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    // Simulate fetching a theme
    setTimeout(() => {
      setTheme({ id, name: `Theme with ID ${id}` })
    }, 500)
  }, [id])

  return <div>{theme ? theme.name : "Loading..."}</div>
}
