"use client"

// components/breadcrumb-button.tsx
interface BreadcrumbButtonProps {
  onClick: () => void
}

export function BreadcrumbButton({ onClick }: BreadcrumbButtonProps) {
  return <button onClick={onClick}>Breadcrumb</button>
}
