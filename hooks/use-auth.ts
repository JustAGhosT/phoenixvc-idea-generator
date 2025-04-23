"use client"

import { useAuthContext, type ExtendedUser, type UserRole } from "@/contexts/core/auth-context"
import { useEffect } from "react"

/**
 * Hook for accessing authentication state and methods
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, signIn, signOut } = useAuth()
 * 
 * if (isAuthenticated) {
 *   return <button onClick={() => signOut()}>Sign out</button>
 * }
 * 
 * return <button onClick={() => signIn()}>Sign in</button>
 * ```
 */
export function useAuth() {
  const auth = useAuthContext()
  
  return auth
}

/**
 * Hook for protected components that require authentication
 * Redirects to sign-in page if user is not authenticated
 * 
 * @example
 * ```tsx
 * // Basic usage - requires any authenticated user
 * useRequireAuth()
 * 
 * // Require specific role
 * useRequireAuth("admin")
 * 
 * // Require any of multiple roles
 * useRequireAuth(["admin", "editor"])
 * ```
 */
export function useRequireAuth(requiredRole?: UserRole | UserRole[]) {
  const { isAuthenticated, hasRole, signIn } = useAuth()
  
  useEffect(() => {
    // If not authenticated, redirect to sign in
    if (!isAuthenticated) {
      signIn()
      return
    }
    
    // If role is required, check if user has the role
    if (requiredRole && !hasRole(requiredRole)) {
      // Handle unauthorized access
      // You could redirect to an unauthorized page or show a message
      console.error("Unauthorized: Required role not found")
    }
  }, [isAuthenticated, hasRole, signIn, requiredRole])
  
  return useAuth()
}

/**
 * Hook to get the current user with type safety
 * Returns null if user is not authenticated
 */
export function useUser(): ExtendedUser | null {
  const { user } = useAuth()
  return user
}

/**
 * Hook to check if the current user has a specific role
 * 
 * @example
 * ```tsx
 * const isAdmin = useHasRole("admin")
 * const isEditorOrAdmin = useHasRole(["editor", "admin"])
 * ```
 */
export function useHasRole(role: UserRole | UserRole[]): boolean {
  const { hasRole } = useAuth()
  return hasRole(role)
}