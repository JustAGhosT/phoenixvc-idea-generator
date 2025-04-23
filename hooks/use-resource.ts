"use client"

import { ErrorMonitor } from "@/lib/error-monitoring"
import { useCallback, useEffect, useState } from "react"
import type { ResourceError } from "./use-resource-list"

/**
 * Options for the useResource hook
 */
export interface UseResourceOptions<T> {
  /**
   * Function to fetch the resource
   */
  fetchFn: () => Promise<T>
  
  /**
   * Whether to fetch automatically on mount
   * @default true
   */
  autoFetch?: boolean
  
  /**
   * Initial data to use before fetching
   */
  initialData?: T | null
  
  /**
   * Error handler function
   */
  onError?: (error: ResourceError) => void
  
  /**
   * Context for error reporting
   */
  errorContext?: string
}

/**
 * A reusable hook for fetching and managing a single resource
 * 
 * @example
 * ```tsx
 * const { data: user, loading, error, refetch } = useResource({
 *   fetchFn: () => api.getUser(userId),
 *   errorContext: "user-details"
 * })
 * 
 * if (loading) return <Spinner />
 * if (error) return <ErrorMessage error={error} />
 * if (!user) return <NotFound />
 * 
 * return (
 *   <div>
 *     <Button onClick={refetch}>Refresh</Button>
 *     <UserProfile user={user} />
 *   </div>
 * )
 * ```
 */
export function useResource<T>({
  fetchFn,
  autoFetch = true,
  initialData = null,
  onError,
  errorContext = "resource"
}: UseResourceOptions<T>) {
  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<ResourceError | null>(null)

  const handleError = useCallback((err: unknown) => {
    const resourceError: ResourceError = {
      message: err instanceof Error ? err.message : "An unknown error occurred",
      originalError: err
    }
    
    // Set local error state
    setError(resourceError)
    
    // Call custom error handler if provided
    if (onError) {
      onError(resourceError)
    }
    
    // Report to error monitoring system
    if (typeof ErrorMonitor !== 'undefined') {
      ErrorMonitor.captureException(
        err instanceof Error ? err : new Error(resourceError.message),
        { context: errorContext }
      )
    } else {
      console.error(`[${errorContext}]`, err)
    }
  }, [onError, errorContext])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetchFn()
      setData(result)
      return result
    } catch (err) {
      handleError(err)
      return null as unknown as T
    } finally {
      setLoading(false)
    }
  }, [fetchFn, handleError])

  // Initial fetch on mount if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchData,
    clearError: () => setError(null)
  }
}