"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AuthFallbackProps {
  children: React.ReactNode;
}

export function AuthFallback({ children }: AuthFallbackProps) {
  const { status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // This ensures we only run this on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle errors from useAuthContext
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes("useAuthContext must be used within an AuthProvider")) {
        setError("Authentication context is not available. Some features may be limited.");
        console.warn("AuthProvider missing:", event.error);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  // If we're on the server or still loading, just render children
  if (!isClient || status === "loading") {
    return <div>{children}</div>;
  }

  return (
    <div>
      {error && (
        <Alert className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Warning</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {children}
    </div>
  );
}