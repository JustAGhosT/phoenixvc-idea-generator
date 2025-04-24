"use client"

import { useAuth } from "@/hooks/use-auth"
import { initClientErrorHandling } from "@/lib/client-error-handler"
import { clearUser, initSentry, setUser } from "@/lib/sentry"
import { useEffect } from "react"

/**
 * Global error handler component that initializes error handling
 * and sets up user context for error tracking
 */
export function GlobalErrorHandler() {
  const { user } = useAuth()

  useEffect(() => {
    // Initialize Sentry
    initSentry()

    // Initialize client-side error handling
    initClientErrorHandling()

    // Clean up on unmount (though this is unlikely to be called)
    return () => {
      clearUser()
    }
  }, [])

  // Set user context for error tracking when user changes
  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        email: user.email || undefined,
        username: user.name || undefined,
      })
    } else {
      clearUser()
    }
  }, [user])

  // This component doesn't render anything
  return null
}
