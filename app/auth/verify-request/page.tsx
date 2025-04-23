"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export default function VerifyRequestPage() {
  const router = useRouter()
  
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
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            A sign in link has been sent to your email address
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 text-center text-muted-foreground">
            <p>
              We've sent you an email with a magic link that will sign you in instantly.
            </p>
            <p>
              Please check your email and click the link to continue.
            </p>
            <p className="text-sm">
              If you don't see the email, check your spam folder or try again.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={handleGoHome}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}