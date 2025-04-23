"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { SignInButton } from "./sign-in-button"

export function AuthRedirect({ 
  children,
  protectedPaths = ["/dashboard", "/profile", "/settings"]
}: {
  children: React.ReactNode
  protectedPaths?: string[]
}) {
  const { status } = useSession()
  const pathname = usePathname()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )
  
  useEffect(() => {
    // If the user is not authenticated and tries to access a protected path
    if (status === "unauthenticated" && isProtectedPath) {
      setShowAuthPrompt(true)
    } else {
      setShowAuthPrompt(false)
}
  }, [status, isProtectedPath])
  
  if (showAuthPrompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Authentication Required</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please sign in to access this page
            </p>
          </div>
          <div className="flex justify-center">
            <SignInButton />
          </div>
        </div>
      </div>
    )
  }
  
  return children
}