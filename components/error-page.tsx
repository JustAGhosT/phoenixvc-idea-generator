"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

interface ErrorPageProps {
  title?: string
  description?: string
  error?: Error
  reset?: () => void
  showHome?: boolean
}

/**
 * Generic error page component
 */
export function ErrorPage({
  title = "Something went wrong",
  description = "An unexpected error occurred",
  error,
  reset,
  showHome = true,
}: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>

        {process.env.NODE_ENV !== "production" && error && (
          <div className="mb-6 p-4 bg-muted rounded-md text-left overflow-auto max-h-[200px]">
            <p className="font-mono text-sm">{error.message}</p>
            {error.stack && <pre className="text-xs mt-2 text-muted-foreground whitespace-pre-wrap">{error.stack}</pre>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {reset && <Button onClick={reset}>Try again</Button>}

          {showHome && (
            <Button variant="outline" asChild>
              <Link href="/">Return to home</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
