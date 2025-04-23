"use client"

import { ErrorMonitor } from "@/lib/error-monitoring"
import { useCallback, useEffect, useState } from "react"

/**
 * Generic error type for resource operations
 */
export interface ResourceError {
  message: string
  code?: string
  status?: number
  originalError?: unknown
}

/**
 * Options for the useResourceList hook
 */
export interface UseResourceListOptions<T> {
  /**
   * Function to fetch the list of resources
   */
  fetchFn: () => Promise<T[]>
  
  /**
   * Whether to fetch automatically on mount
   * @default true
   */
  autoFetch?: boolean
  
  /**
   * Initial data to use before fetching
   */
  initialData?: T[]
  
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
 * A reusable hook for fetching and managing lists of resources
 * 
 * @example
 * ```tsx
 * const { data: users, loading, error, refetch } = useResourceList({
 *   fetchFn: () => api.getUsers(),
 *   errorContext: "users-list"
 * })
 * 
 * if (loading) return <Spinner />
 * if (error) return <ErrorMessage error={error} />
 * 
 * return (
 *   <div>
 *     <Button onClick={refetch}>Refresh</Button>
 *     <UserList users={users} />
 *   </div>
 * )
 * ```
 */
export function useResourceList<T>({
  fetchFn,
  autoFetch = true,
  initialData = [],
  onError,
  errorContext = "resource-list"
}: UseResourceListOptions<T>) {
  const [data, setData] = useState<T[]>(initialData)
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
      return [] as T[]
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