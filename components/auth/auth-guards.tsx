"use client"

import { UserRole } from "@/contexts/core/auth-context"
import { useAuth } from "@/hooks/use-auth"
import { ReactNode } from "react"

interface RoleGuardProps {
  /**
   * The role(s) required to render the children
   */
  role: UserRole | UserRole[]
  
  /**
   * The content to render if the user has the required role
   */
  children: ReactNode
  
  /**
   * Content to render if the user doesn't have the required role
   * @default null
   */
  fallback?: ReactNode
}

/**
 * Component that conditionally renders content based on user roles
 * 
 * @example
 * ```tsx
 * <RoleGuard role="admin">
 *   <AdminPanel />
 * </RoleGuard>
 * 
 * <RoleGuard role={["admin", "editor"]} fallback={<AccessDenied />}>
 *   <ContentEditor />
 * </RoleGuard>
 * ```
 */
export function RoleGuard({ role, children, fallback = null }: RoleGuardProps) {
  const { hasRole, isAuthenticated } = useAuth()
  
  // If not authenticated or doesn't have the required role, show fallback
  if (!isAuthenticated || !hasRole(role)) {
    return <>{fallback}</>
  }
  
  // Otherwise, show the children
  return <>{children}</>
}

interface AuthGuardProps {
  /**
   * The content to render if the user is authenticated
   */
  children: ReactNode
  
  /**
   * Content to render if the user is not authenticated
   * @default null
   */
  fallback?: ReactNode
}

/**
 * Component that conditionally renders content based on authentication status
 * 
 * @example
 * ```tsx
 * <AuthGuard fallback={<SignInPrompt />}>
 *   <UserProfile />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({ children, fallback = null }: AuthGuardProps) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

interface GuestGuardProps {
  /**
   * The content to render if the user is not authenticated
   */
  children: ReactNode
  
  /**
   * Content to render if the user is authenticated
   * @default null
   */
  fallback?: ReactNode
}

/**
 * Component that conditionally renders content for guests (non-authenticated users)
 * 
 * @example
 * ```tsx
 * <GuestGuard fallback={<Navigate to="/dashboard" />}>
 *   <LandingPage />
 * </GuestGuard>
 * ```
 */
export function GuestGuard({ children, fallback = null }: GuestGuardProps) {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}