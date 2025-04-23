"use client"

import { Session } from "next-auth"
import { SessionProvider, signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from "next-auth/react"
import React, { createContext, useContext, useEffect, useState } from "react"

// Define user roles
export type UserRole = "user" | "admin" | "editor" | "viewer"

// Extended user type with roles
export interface ExtendedUser {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  roles?: UserRole[]
}

// Extended session type with our custom properties
export interface ExtendedSession extends Session {
  user?: ExtendedUser
  expires: string
}

// Auth context type definition
export interface AuthContextType {
  // Session data
  session: ExtendedSession | null
  status: "loading" | "authenticated" | "unauthenticated"
  
  // User data and roles
  user: ExtendedUser | null
  roles: UserRole[]
  
  // Auth state helpers
  isLoading: boolean
  isAuthenticated: boolean
  
  // Auth methods
  signIn: (provider?: string, options?: any) => Promise<void>
  signOut: () => Promise<void>
  
  // Role-based helpers
  hasRole: (role: UserRole | UserRole[]) => boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook to use the auth context
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

// For backward compatibility
export const useAuth = useAuthContext

// Props for the AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode
  session: Session | null
}

// Internal provider component that uses the useSession hook
function AuthContextProvider({ children }: { children: React.ReactNode }) {
  // Get session data from NextAuth
  const { data: session, status } = useSession()
  
  // Local state for derived values
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [roles, setRoles] = useState<UserRole[]>([])
  
  // Update user and roles when session changes
  useEffect(() => {
    if (session?.user) {
      // Extract user from session
      setUser(session.user as ExtendedUser)
      
      // Extract roles from user or set default role
      const userRoles = (session.user as ExtendedUser).roles || ["user"]
      setRoles(userRoles)
    } else {
      setUser(null)
      setRoles([])
    }
  }, [session])
  
  // Wrap the NextAuth signIn function
  const signIn = async (provider?: string, options?: any) => {
    try {
      await nextAuthSignIn(provider, options)
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }
  
  // Wrap the NextAuth signOut function
  const signOut = async () => {
    try {
      await nextAuthSignOut()
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }
  
  // Helper to check if user has a specific role or any of the roles in an array
  const hasRole = (roleOrRoles: UserRole | UserRole[]): boolean => {
    if (!user) return false
    
    if (Array.isArray(roleOrRoles)) {
      return roleOrRoles.some(role => roles.includes(role))
    }
    
    return roles.includes(roleOrRoles)
  }
  
  // Create the context value
  const value: AuthContextType = {
    session: session as ExtendedSession | null,
    status,
    user,
    roles,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    signIn,
    signOut,
    hasRole
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Main AuthProvider component that wraps the NextAuth SessionProvider
export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  )
}