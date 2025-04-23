"use client"

import { SignInForm } from "@/components/auth/sign-in-form"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  
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
        callbackUrl={callbackUrl}
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