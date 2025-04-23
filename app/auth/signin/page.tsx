"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signIn("google", { callbackUrl })
    setIsLoading(false)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
          
          <div className="text-center text-sm">
            <Link 
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
