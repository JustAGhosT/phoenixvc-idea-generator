"use client"

import { Session } from "next-auth"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import React, { createContext, useContext } from "react"

interface AuthContextType {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  signIn: (provider?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

// For backward compatibility
export const useAuth = useAuthContext

interface AuthProviderProps {
  children: React.ReactNode
  session: Session | null
}

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const handleSignIn = async (provider?: string) => {
    await signIn(provider, { callbackUrl: "/" })
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const value = {
    session,
    status,
    signIn: handleSignIn,
    signOut: handleSignOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  )
}