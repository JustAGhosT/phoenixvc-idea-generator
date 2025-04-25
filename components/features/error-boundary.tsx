"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught in error boundary:", event.error);
      setError(event.error);
      setHasError(true);
      
      // Prevent the error from propagating
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          <p>{error?.message || "An unexpected error occurred"}</p>
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setHasError(false);
                setError(null);
                window.location.reload();
              }}
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Refresh page
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}