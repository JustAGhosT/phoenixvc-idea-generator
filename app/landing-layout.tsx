import { ReactNode } from "react";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* No sidebar for non-authenticated users */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}