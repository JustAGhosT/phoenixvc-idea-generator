"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Check authentication status when component mounts or status changes
    if (status === "unauthenticated") {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);
  
  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  // If authenticated, render children
  if (status === "authenticated") {
    return <>{children}</>;
  }
  
  // Default loading state (should not reach here due to redirect)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}