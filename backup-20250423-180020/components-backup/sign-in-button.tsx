"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signIn, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function SignInButton({ variant = "default" }: { variant?: "default" | "outline" | "ghost" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const { status } = useSession()
  
  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    // Use the current path as the callback URL
    await signIn(provider, { callbackUrl: pathname })
    setIsLoading(false)
    setIsOpen(false)
  }
  
  // If the user is already signed in, don't show the button
  if (status === "authenticated") {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to your account to access all features
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Button 
            className="w-full"
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}