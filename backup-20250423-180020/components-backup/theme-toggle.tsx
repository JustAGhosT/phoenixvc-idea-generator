// components/theme-toggle.tsx
"use client"

import { useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</button>
}
