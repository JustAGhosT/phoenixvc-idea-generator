"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get error details from URL parameters
  const error = searchParams.get("error")
  
  // Map error codes to user-friendly messages
  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in."
      case "Verification":
        return "The verification link is invalid or has expired."
      case "OAuthSignin":
        return "Error in the OAuth sign-in process. Please try again."
      case "OAuthCallback":
        return "Error in the OAuth callback process. Please try again."
      case "OAuthCreateAccount":
        return "Could not create an OAuth provider account. Please try another provider."
      case "EmailCreateAccount":
        return "Could not create an email account. Please try another method."
      case "Callback":
        return "Error in the authentication callback. Please try again."
      case "OAuthAccountNotLinked":
        return "To confirm your identity, sign in with the same account you used originally."
      case "EmailSignin":
        return "The email sign-in link is invalid or has expired."
      case "CredentialsSignin":
        return "The credentials you provided are invalid. Please check and try again."
      case "SessionRequired":
        return "Please sign in to access this page."
      default:
        return "An unknown error occurred during authentication. Please try again."
    }
  }
  
  const handleTryAgain = () => {
    router.push("/auth/signin")
  }
  
  const handleGoHome = () => {
    router.push("/")
  }
  
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mb-8">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={80} 
          height={80} 
          className="mx-auto"
        />
      </div>
      
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg text-center">
            <p className="text-red-800 dark:text-red-300">{getErrorMessage()}</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoHome}>
            Go Home
          </Button>
          <Button onClick={handleTryAgain}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}