"use client"

// components/breadcrumb-dialog.tsx
interface BreadcrumbDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function BreadcrumbDialog({ isOpen, onClose }: BreadcrumbDialogProps) {
  return isOpen ? (
    <div>
      <h2>Breadcrumb Dialog</h2>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
}
