// app/breadcrumbs/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
// Breadcrumb item component was removed in cleanup

export default function BreadcrumbDetailsPage() {
  const params = useParams()
  const { id } = params
  
  // Set page title and breadcrumb
  usePage({ 
    title: `Breadcrumb ${id}`,
    titleSuffix: " | Breadcrumb Demo" 
  })
  const params = useParams()
  const { id } = params

  return (
    <div>
      <h1>Breadcrumb Details</h1>
      /* BreadcrumbItem component was removed in cleanup */
      <p>Breadcrumb ID: {id}</p>
    </div>
  )
}
