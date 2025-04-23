"use client"

// components/theme-dialog.tsx
interface ThemeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ThemeDialog({ isOpen, onClose }: ThemeDialogProps) {
  return isOpen ? (
    <div>
      <h2>Theme Dialog</h2>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
}
