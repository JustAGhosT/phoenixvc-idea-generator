"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export interface SignInFormProps {
  /**
   * Available authentication providers
   * @default ["google", "email"]
   */
  providers?: ("google" | "github" | "email")[]
  
  /**
   * Whether to show the email sign-in form
   * @default true
   */
  showEmailSignIn?: boolean
  
  /**
   * URL to redirect to after successful sign-in
   */
  callbackUrl?: string
  
  /**
   * Custom logo component
   */
  logo?: React.ReactNode
  
  /**
   * Title for the sign-in form
   * @default "Sign In"
   */
  title?: string
  
  /**
   * Description for the sign-in form
   * @default "Sign in to your account to continue"
   */
  description?: string
}

export function SignInForm({
  providers = ["google", "email"],
  showEmailSignIn = true,
  callbackUrl,
  logo,
  title = "Sign In",
  description = "Sign in to your account to continue",
}: SignInFormProps) {
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  // Get callback URL from props or search params
  const returnUrl = callbackUrl || searchParams.get("callbackUrl") || "/"
  
  // Email sign-in state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // Handle OAuth sign-in
  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsLoading(true)
      await signIn(provider, { callbackUrl: returnUrl })
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
      toast({
        title: "Authentication Error",
        description: `There was a problem signing in with ${provider}.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle email sign-in
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }
    
    try {
      setIsLoading(true)
      
      if (providers.includes("email")) {
        // Passwordless email sign-in
        await signIn("email", { email, callbackUrl: returnUrl })
        toast({
          title: "Check Your Email",
          description: "We've sent you a login link. Please check your email.",
        })
      } else {
        // Password-based sign-in
        await signIn("credentials", { 
          email, 
          password,
          callbackUrl: returnUrl
        })
      }
    } catch (error) {
      console.error("Error signing in with email:", error)
      toast({
        title: "Authentication Error",
        description: "There was a problem signing in with your email.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        {logo && <div className="flex justify-center mb-4">{logo}</div>}
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        {/* OAuth Providers */}
        <div className="grid gap-2">
          {providers.includes("google") && (
            <Button 
              variant="outline" 
              type="button" 
              disabled={isLoading}
              onClick={() => handleOAuthSignIn("google")}
              className="w-full"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              Sign in with Google
            </Button>
          )}
          
          {providers.includes("github") && (
            <Button 
              variant="outline" 
              type="button" 
              disabled={isLoading}
              onClick={() => handleOAuthSignIn("github")}
              className="w-full"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}
              Sign in with GitHub
            </Button>
          )}
        </div>
        
        {/* Email Sign In */}
        {showEmailSignIn && (
          <>
            {(providers.includes("google") || providers.includes("github")) && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleEmailSignIn}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                {!providers.includes("email") && (
                  <div className="grid gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
                
                <Button type="submit" disabled={isLoading} className="mt-2">
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  {providers.includes("email") ? "Send Magic Link" : "Sign In"}
                </Button>
              </div>
            </form>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-muted-foreground">
          <span>Don't have an account? </span>
          <Link 
            href="/auth/signup" 
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
        
        <Link 
          href="/" 
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Return to home
        </Link>
      </CardFooter>
    </Card>
  )
}