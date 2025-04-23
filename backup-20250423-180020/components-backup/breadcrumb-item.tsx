// components/breadcrumb-item.tsx
"use client"

import { useEffect, useState } from "react"

interface BreadcrumbItemProps {
  id: string
}

export function BreadcrumbItem({ id }: BreadcrumbItemProps) {
  const [breadcrumb, setBreadcrumb] = useState(null)

  useEffect(() => {
    // Simulate fetching a breadcrumb
    setTimeout(() => {
      setBreadcrumb({ id, label: `Breadcrumb with ID ${id}` })
    }, 500)
  }, [id])

  return <div>{breadcrumb ? breadcrumb.label : "Loading..."}</div>
}
