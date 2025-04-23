"use client"

// components/theme-button.tsx
interface ThemeButtonProps {
  onClick: () => void
}

export function ThemeButton({ onClick }: ThemeButtonProps) {
  return <button onClick={onClick}>Theme</button>
}
