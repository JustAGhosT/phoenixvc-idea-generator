"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRole } from "@/contexts/core/auth-context"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export interface AuthRedirectProps {
  /**
   * Child components to render when authentication passes
   */
  children: React.ReactNode
  
  /**
   * Paths that require authentication
   * @default ["/dashboard", "/profile", "/settings", "/editor", "/risk-analysis"]
   */
  protectedPaths?: string[]
  
  /**
   * Paths that require specific roles
   * @example { "/admin": "admin", "/editor": ["editor", "admin"] }
   */
  roleProtectedPaths?: Record<string, UserRole | UserRole[]>
  
  /**
   * Whether to show a loading state while checking authentication
   * @default true
   */
  showLoading?: boolean
  
  /**
   * Custom component to show when authentication is required
   */
  authPromptComponent?: React.ReactNode
  
  /**
   * Whether to redirect to the sign-in page instead of showing an auth prompt
   * @default false
   */
  redirectToSignIn?: boolean
  
  /**
   * URL to redirect to after successful authentication
   * If not provided, the user will be redirected back to the current path
   */
  callbackUrl?: string
}

/**
 * Component that handles authentication redirects and protected routes
 * 
 * @example
 * ```tsx
 * <AuthRedirect>
 *   <YourProtectedContent />
 * </AuthRedirect>
 * ```
 */
export function AuthRedirect({ 
  children,
  protectedPaths = ["/dashboard", "/profile", "/settings", "/editor", "/risk-analysis"],
  roleProtectedPaths = {},
  showLoading = true,
  authPromptComponent,
  redirectToSignIn = false,
  callbackUrl,
}: AuthRedirectProps) {
  const { status, isAuthenticated, hasRole, signIn } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [requiredRole, setRequiredRole] = useState<UserRole | UserRole[] | null>(null)
  
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname?.startsWith(path)
  )
  
  // Check if the path requires a specific role
  const pathRequiresRole = Object.entries(roleProtectedPaths).find(([path]) => 
    pathname?.startsWith(path)
  )
  
  useEffect(() => {
    // If we're checking a role-protected path
    if (pathRequiresRole) {
      const [path, role] = pathRequiresRole
      setRequiredRole(role)
      
      // If authenticated but doesn't have the required role
      if (isAuthenticated && !hasRole(role)) {
        // Show unauthorized message or redirect
        setShowAuthPrompt(true)
        return
      }
    }
    
    // If the user is not authenticated and tries to access a protected path
    if (status === "unauthenticated" && isProtectedPath) {
      if (redirectToSignIn) {
        // Redirect to sign in page with callback URL
        const returnUrl = callbackUrl || pathname
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(returnUrl)}`)
      } else {
        setShowAuthPrompt(true)
      }
    } else {
      setShowAuthPrompt(false)
    }
  }, [status, isProtectedPath, pathRequiresRole, isAuthenticated, hasRole, redirectToSignIn, router, pathname, callbackUrl])
  
  // Show loading state while checking authentication
  if (status === "loading" && showLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Checking authentication...</p>
      </div>
    )
  }
  
  // Show auth prompt if needed
  if (showAuthPrompt) {
    // Use custom auth prompt if provided
    if (authPromptComponent) {
      return <>{authPromptComponent}</>
    }
    
    // Show role-based unauthorized message
    if (requiredRole && isAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Unauthorized Access</CardTitle>
              <CardDescription className="text-center">
                You don't have permission to access this page
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-center">
              <p>
                This page requires {Array.isArray(requiredRole) 
                  ? `one of these roles: ${requiredRole.join(', ')}` 
                  : `the ${requiredRole} role`
                }
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => router.push('/')}>
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }
    
    // Show default auth prompt
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Authentication Required</CardTitle>
            <CardDescription className="text-center">
              Please sign in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-center text-muted-foreground">
              This content is only available to authenticated users.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push('/')}>
              Go Back
            </Button>
            <Button onClick={() => signIn()}>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  // If all checks pass, render the children
  return <>{children}</>
}