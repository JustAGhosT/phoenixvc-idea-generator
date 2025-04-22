// app/theme/page.tsx
"use client"

import { ThemeList } from "@/components/theme-list"

export default function ThemePage() {
  return (
    <div>
      <h1>Themes</h1>
      <ThemeList />
    </div>
  )
}
