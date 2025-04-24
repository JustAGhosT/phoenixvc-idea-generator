import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AlertTriangle, Home, RefreshCcw } from "lucide-react"
import Link from "next/link"

interface ErrorPageProps {
  title?: string
  description?: string
  error?: Error
  reset?: () => void
  className?: string
}

/**
 * A reusable error page component that displays an error message and provides options to retry or go home
 */
export function ErrorPage({
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again or return to the home page.",
  error,
  reset,
  className,
}: ErrorPageProps) {
  return (
    <div className={cn("flex min-h-[50vh] items-center justify-center p-4", className)}>
      <Card className="mx-auto max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        
        {error && (
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <p className="font-mono text-sm text-muted-foreground break-words">
                {error.message || "Unknown error"}
              </p>
            </div>
          </CardContent>
        )}
        
        <CardFooter className="flex justify-center gap-4">
          {reset && (
            <Button 
              variant="outline" 
              onClick={reset}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

/**
 * A full-page error component for use in page layouts
 */
export function FullPageError({
  title,
  description,
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <ErrorPage
        title={title}
        description={description}
        error={error}
        reset={reset}
      />
    </div>
  )
}