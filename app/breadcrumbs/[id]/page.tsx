// app/breadcrumbs/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { BreadcrumbItem } from "@/components/breadcrumb-item"

export default function BreadcrumbDetailsPage() {
  const params = useParams()
  const { id } = params

  return (
    <div>
      <h1>Breadcrumb Details</h1>
      <BreadcrumbItem id={id as string} />
    </div>
  )
}
