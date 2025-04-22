// app/theme/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { ThemeItem } from "@/components/theme-item"

export default function ThemeDetailsPage() {
  const params = useParams()
  const { id } = params

  return (
    <div>
      <h1>Theme Details</h1>
      <ThemeItem id={id as string} />
    </div>
  )
}
