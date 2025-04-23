"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

export interface SignOutFormProps {
  /**
   * URL to redirect to after sign-out
   * @default "/"
   */
  redirectUrl?: string
  
  /**
   * Title for the sign-out page
   * @default "Sign Out"
   */
  title?: string
  
  /**
   * Description for the sign-out page
   * @default "Are you sure you want to sign out?"
   */
  description?: string
  
  /**
   * Text for the sign-out button
   * @default "Sign Out"
   */
  signOutButtonText?: string
  
  /**
   * Text for the cancel button
   * @default "Cancel"
   */
  cancelButtonText?: string
}

export function SignOutForm({
  redirectUrl = "/",
  title = "Sign Out",
  description = "Are you sure you want to sign out?",
  signOutButtonText = "Sign Out",
  cancelButtonText = "Cancel"
}: SignOutFormProps) {
  const { signOut, user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
      router.push(redirectUrl)
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    router.back()
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {user && (
          <div className="flex items-center justify-center gap-4 p-4 mb-4 bg-muted rounded-lg">
            {user.image && (
              <img 
                src={user.image} 
                alt={user.name || "User"} 
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {cancelButtonText}
        </Button>
        
        <Button
          variant="destructive"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {signOutButtonText}
        </Button>
      </CardFooter>
    </Card>
  )
}