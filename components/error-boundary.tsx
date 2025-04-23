"use client"

import { Component, type ErrorInfo, type ReactNode, lazy, Suspense } from "react"
import { captureException } from "@/lib/sentry"
import { createLogger } from "@/lib/logger"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

const logger = createLogger("error-boundary")

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: any[]
}

interface State {
  hasError: boolean
  error: Error | null
}

// Dynamically import SessionProvider as a client component
const SessionProviderClient = lazy(() =>
  import("next-auth/react").then((module) => ({ default: module.SessionProvider })),
)

/**
 * Error boundary component to catch and handle errors in the component tree
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error
    logger.error(`Component error: ${error.message}`, error, {
      componentStack: errorInfo.componentStack,
    })

    // Send to Sentry
    captureException(error, {
      extra: { componentStack: errorInfo.componentStack },
    })

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: Props): void {
    // If any of the resetKeys changed, reset the error boundary
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      this.props.resetKeys.some((key, index) => key !== prevProps.resetKeys?.[index])
    ) {
      this.reset()
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render the fallback UI if provided, otherwise render a default error message
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive">
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Something went wrong</h3>
          </div>
          <p className="text-sm mb-4">{this.state.error?.message || "An unexpected error occurred"}</p>
          <Button size="sm" onClick={this.reset}>
            Try again
          </Button>
        </div>
      )
    }

    return (
      <Suspense fallback={null}>
        <SessionProviderClient>{this.props.children}</SessionProviderClient>
      </Suspense>
    )
  }
}
