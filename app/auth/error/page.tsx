"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  
  let errorMessage = "An unknown error occurred during authentication."
  
  // Handle specific error types
  if (error === "Signin") {
    errorMessage = "Try signing in with a different account."
  } else if (error === "OAuthSignin" || error === "OAuthCallback") {
    errorMessage = "Error occurred during the OAuth sign in process."
  } else if (error === "OAuthCreateAccount") {
    errorMessage = "Error creating a user account with the OAuth provider."
  } else if (error === "Callback") {
    errorMessage = "Error during the callback process."
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "This email is already associated with another account. Please sign in using the original provider."
  } else if (error === "EmailSignin") {
    errorMessage = "Error sending the email for sign in."
  } else if (error === "CredentialsSignin") {
    errorMessage = "Invalid credentials. Please check your email and password."
  } else if (error === "SessionRequired") {
    errorMessage = "You must be signed in to access this page."
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Authentication Error</h1>
          <p className="text-gray-600 dark:text-gray-300">{errorMessage}</p>
          {error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Error code: {error}
            </p>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button asChild>
            <Link href="/auth/signin">
              Try Again
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}