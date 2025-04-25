import { TopNav } from "@/components/top-nav";
import { Sidebar } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for authenticated users */}
      <Sidebar />
      
      <div className="flex-1">
        <TopNav />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}