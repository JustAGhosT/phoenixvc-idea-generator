"use client"

import { useEffect } from "react"
import { ErrorPage } from "@/components/error-page"
import { captureClientError } from "@/lib/client-error-handler"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error
    captureClientError(error, {
      type: "global-error",
      digest: error.digest,
    })
  }, [error])

  return (
    <html>
      <body>
        <ErrorPage
          title="Application Error"
          description="The application encountered an unexpected error."
          error={error}
          reset={reset}
        />
      </body>
    </html>
  )
}
