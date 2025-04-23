// components/breadcrumb-list.tsx
"use client"

interface BreadcrumbListProps {
  breadcrumbs: any[]
}

export function BreadcrumbList({ breadcrumbs }: BreadcrumbListProps) {
  return (
    <ul>
      {breadcrumbs.map((breadcrumb) => (
        <li key={breadcrumb.id}>{breadcrumb.label}</li>
      ))}
    </ul>
  )
}
