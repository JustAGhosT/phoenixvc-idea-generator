import { getServerAuthSession } from "@/auth"
import { getUserRole } from "@/lib/db"

// Check if user has required role
export async function hasRequiredRole(requiredRoles: string[]): Promise<boolean> {
  const session = await getServerAuthSession()

  if (!session || !session.user) return false

  // If role is already in session, use it
  if (session.user.role) {
    return requiredRoles.includes(session.user.role)
  }

  // Otherwise fetch from database
  const role = await getUserRole(session.user.id)
  return role ? requiredRoles.includes(role) : false
}

// Get current user session with error handling
export async function getCurrentUser() {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  return session.user
}
