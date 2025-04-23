"use client"

import { useEffect } from "react"
import { ErrorPage } from "@/components/error-page"
import { captureClientError } from "@/lib/client-error-handler"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string } | null
  reset: () => void
}) {
  useEffect(() => {
    if (error) {
      // Log the error
      captureClientError(error, {
        type: "global-error",
        digest: error.digest,
      })
    }
  }, [error])

  return (
    <html>
      <body>
        <ErrorPage
          title="Application Error"
          description="The application encountered an unexpected error."
          error={error || new Error("Unknown error")}
          reset={reset}
        />
      </body>
    </html>
  )
}
