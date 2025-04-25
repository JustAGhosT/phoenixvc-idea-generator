// Server-side authentication utilities
import { ExtendedSession } from "@/contexts/core/auth-context"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

/**
 * Gets the authentication session on the server side
 * 
 * @returns The session object or null if not authenticated
 */
export async function getServerAuthSession(): Promise<ExtendedSession | null> {
  try {
    const session = await getServerSession(authOptions)
    return session as ExtendedSession | null
  } catch (error) {
    console.error("Error getting server auth session:", error)
    return null
  }
}

/**
 * Checks if a user is authenticated on the server side
 * 
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerAuthSession()
  return !!session
}

/**
 * Gets the current user from the session on the server side
 * 
 * @returns The user object or null if not authenticated
 */
export async function getServerUser() {
  const session = await getServerAuthSession()
  return session?.user || null
}

/**
 * Checks if the current user has a specific role on the server side
 * 
 * @param role Role or array of roles to check
 * @returns True if the user has the role, false otherwise
 */
export async function hasServerRole(role: string | string[]): Promise<boolean> {
  const session = await getServerAuthSession()
  
  if (!session?.user?.roles) {
    return false
  }
  
  if (Array.isArray(role)) {
    return role.some(r => session.user?.roles?.includes(r))
  }
  
  return session.user.roles.includes(role)
}