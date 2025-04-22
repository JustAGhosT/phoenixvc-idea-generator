"use client"

import { ErrorPage } from "@/components/error-page"

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <ErrorPage
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      showHome={true}
    />
  )
}
