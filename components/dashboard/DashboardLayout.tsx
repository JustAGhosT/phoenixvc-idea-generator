"use client";

import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils/formatters";
import { BarChart2, List, Loader2, PlusCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { UserMenu } from "./UserMenu";

interface DashboardLayoutProps {
  title: string;
  userName: string;
  userEmail?: string;
  avatarUrl?: string;
  lastUpdated: Date | null;
  isLoading: boolean;
  onRefresh: () => void;
  onSignOut?: () => void;
  viewMode?: "visual" | "text";
  onToggleViewMode?: () => void;
  children: ReactNode;
}

export function DashboardLayout({
  title,
  userName,
  userEmail,
  avatarUrl,
  lastUpdated,
  isLoading,
  onRefresh,
  onSignOut,
  viewMode,
  onToggleViewMode,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">
            Welcome back!
            {lastUpdated && (
              <span className="ml-2 text-xs opacity-70">
                (updated {formatRelativeTime(lastUpdated)})
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            
            {viewMode && onToggleViewMode && (
              <Button variant="outline" onClick={onToggleViewMode}>
                {viewMode === "visual" ? (
                  <List className="h-4 w-4 mr-2" />
                ) : (
                  <BarChart2 className="h-4 w-4 mr-2" />
                )}
                {viewMode === "visual" ? "Text View" : "Visual View"}
              </Button>
            )}
            
            <Button asChild>
              <Link href="/projects/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
          
          {/* User Avatar and Menu */}
          <UserMenu 
            userName={userName}
            userEmail={userEmail}
            avatarUrl={avatarUrl}
            onSignOut={onSignOut}
          />
        </div>
      </div>

      {children}
      
      {/* Footer action buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
    </div>
  );
}