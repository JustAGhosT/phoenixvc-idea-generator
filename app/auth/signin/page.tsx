"use client"

import { SignInForm } from "@/components/auth/sign-in-form"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const rawCallbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [processedCallbackUrl, setProcessedCallbackUrl] = useState(rawCallbackUrl)
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  
  // Process the callback URL once on component mount
  useEffect(() => {
    // Function to recursively decode a URL until it can't be decoded further
    const fullyDecodeUrl = (url: string): string => {
      try {
        const decoded = decodeURIComponent(url)
        return decoded === url ? url : fullyDecodeUrl(decoded)
      } catch (e) {
        console.error("Error decoding URL:", e)
        return url
      }
    }
    
    // Decode the callback URL
    const decodedUrl = fullyDecodeUrl(rawCallbackUrl)
    
    // Prevent redirect loops by checking if the callback URL is the sign-in page
    if (decodedUrl.includes("/auth/signin")) {
      setProcessedCallbackUrl("/dashboard")
    } else {
      setProcessedCallbackUrl(decodedUrl)
    }
  }, [rawCallbackUrl])
  
  // If already authenticated, redirect to callback URL
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log("Redirecting authenticated user to:", processedCallbackUrl)
      router.push(processedCallbackUrl)
    }
  }, [isAuthenticated, isLoading, router, processedCallbackUrl])
  
  // If still loading or already authenticated, show loading state
  if (isLoading || isAuthenticated) {
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
        <div className="text-center">
          <p className="text-lg">Redirecting...</p>
        </div>
      </div>
    )
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
      
      <SignInForm 
        callbackUrl={processedCallbackUrl}
        providers={["google", "email"]}
        title="Welcome Back"
        description="Sign in to your account to continue"
      />
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        By signing in, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}