// components/theme-list.tsx
"use client"

interface ThemeListProps {
  themes: any[]
}

export function ThemeList({ themes }: ThemeListProps) {
  return (
    <ul>
      {themes.map((theme) => (
        <li key={theme.id}>{theme.name}</li>
      ))}
    </ul>
  )
}
