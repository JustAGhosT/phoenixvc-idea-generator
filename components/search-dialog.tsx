"use client"

// components/search-dialog.tsx
interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  return isOpen ? (
    <div>
      <h2>Search Dialog</h2>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
}
