"use client"

import { useEffect } from "react"
import { initClientErrorHandling } from "@/lib/client-error-handler"
import { initSentry, setUser, clearUser } from "@/lib/sentry"
import { useSession } from "next-auth/react"

/**
 * Global error handler component that initializes error handling
 * and sets up user context for error tracking
 */
export function GlobalErrorHandler() {
  const { data: session } = useSession()

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

  // Set user context for error tracking when session changes
  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || undefined,
        username: session.user.name || undefined,
      })
    } else {
      clearUser()
    }
  }, [session])

  // This component doesn't render anything
  return null
}
