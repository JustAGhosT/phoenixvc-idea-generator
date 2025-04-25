"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export function AuthErrorHandler() {
  const [error, setError] = useState<{ message: string; code: string } | null>(null);

  useEffect(() => {
    // Check URL for error parameters
    const url = new URL(window.location.href);
    const errorParam = url.searchParams.get("error");
    
    if (errorParam) {
      let errorMessage = "An authentication error occurred";
      let errorCode = errorParam;
      
      // Map known error codes to user-friendly messages
      switch (errorParam) {
        case "Configuration":
          errorMessage = "There is a problem with the server configuration.";
          break;
        case "AccessDenied":
          errorMessage = "Access denied. You don't have permission to access this resource.";
          break;
        case "Verification":
          errorMessage = "The verification link may have expired or already been used.";
          break;
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
        case "EmailCreateAccount":
        case "Callback":
        case "OAuthAccountNotLinked":
        case "EmailSignin":
        case "CredentialsSignin":
          errorMessage = "There was a problem with the authentication process. Please try again.";
          break;
        case "SessionRequired":
          errorMessage = "You need to be signed in to access this page.";
          break;
        default:
          if (errorParam.includes("JWT")) {
            errorMessage = "There was a problem with your session. Please sign in again.";
            errorCode = "JWT_ERROR";
          }
      }
      
      setError({ message: errorMessage, code: errorCode });
      
      // Remove the error from URL without refreshing the page
      url.searchParams.delete("error");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, []);
  
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Authentication Error</AlertTitle>
      <AlertDescription>
        <p>{error.message}</p>
        <p className="text-xs mt-1">Error code: {error.code}</p>
        <div className="mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.href = "/auth/signin"}
            className="mr-2"
          >
            Sign In
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}