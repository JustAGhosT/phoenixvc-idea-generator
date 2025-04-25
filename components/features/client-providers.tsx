"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ErrorBoundary } from "./error-boundary";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ErrorBoundary>
    <SessionProvider>
      {children}
    </SessionProvider>
    </ErrorBoundary>
  );
}