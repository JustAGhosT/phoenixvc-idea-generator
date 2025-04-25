"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useEffect } from "react"
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to the console
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-4">
      <div className="rounded-full bg-destructive/10 p-4 text-destructive">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="mt-4 text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        An error occurred while processing your request. We've been notified and are working to fix the issue.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
      <div className="mt-6 flex gap-2">
        <Button onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Go to homepage
        </Button>
      </div>
    </div>
  )
}
