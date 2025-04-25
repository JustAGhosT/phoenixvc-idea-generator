"use client";

import { UserMenu } from "@/components/dashboard/UserMenu";
import { ModeToggle } from "@/components/features/theme/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useNotificationContext } from "@/contexts/features/notification-context";
import { useSearchContext } from "@/contexts/search-context";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { AlertCircle, Bell, LogIn, Menu, Search, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ErrorDetails {
  title: string;
  message: string;
  code?: string;
  timestamp: Date;
}

interface FloatingNavbarProps {
  showSidebarToggle?: boolean;
}

export function FloatingNavbar({ showSidebarToggle = false }: FloatingNavbarProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const [error, setError] = useState<ErrorDetails | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleSidebar } = useSidebarContext();
  const { toggleSearch } = useSearchContext();
  const { unreadCount } = useNotificationContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position to add background blur when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Clear error after 8 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during sign out";
      console.error("Error signing out:", error);
      
      const errorDetails: ErrorDetails = {
        title: "Authentication Error",
        message: errorMessage,
        code: error instanceof Error && (error as any).code ? (error as any).code : "AUTH_SIGNOUT_ERROR",
        timestamp: new Date()
      };
      
      setError(errorDetails);
      
      toast({
        title: errorDetails.title,
        description: errorDetails.message,
        variant: "destructive",
      });
    }
  };

  const handleSignIn = async (provider: string = "google") => {
    try {
      setIsLoggingIn(true);
      await signIn(provider, { callbackUrl: window.location.pathname });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during sign in";
      console.error("Error signing in:", error);
      
      const errorDetails: ErrorDetails = {
        title: "Authentication Error",
        message: errorMessage,
        code: error instanceof Error && (error as any).code ? (error as any).code : "AUTH_SIGNIN_ERROR",
        timestamp: new Date()
      };
      
      setError(errorDetails);
      
      toast({
        title: errorDetails.title,
        description: errorDetails.message,
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle loading state
  if (status === "loading") {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center px-4 justify-between">
            <div className="flex items-center gap-4">
              {showSidebarToggle && (
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              )}
              <Link href="/" className="font-semibold text-xl">
                DeFi Risk Intelligence
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <div className="relative">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center px-4 md:px-6 justify-between">
            <div className="flex items-center gap-4">
              {showSidebarToggle && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              )}
              <Link href="/" className="font-semibold text-xl">
                DeFi Risk Intelligence
              </Link>
              
              {/* Center navigation - desktop only */}
              <nav className="hidden md:flex items-center space-x-1 ml-4">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/projects">Projects</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/analysis-history">Analysis</Link>
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile menu toggle button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
              
              {/* Search button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              
              {/* Theme Toggle */}
              <ModeToggle />
              
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-semibold flex items-center justify-center text-primary-foreground">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-80 overflow-y-auto">
                        {[1, 2, 3].map((i) => (
                          <DropdownMenuItem key={i} className="flex flex-col items-start py-2 cursor-pointer">
                            <div className="font-medium">New feature available</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Check out the new analytics dashboard with improved metrics.
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date().toLocaleDateString()}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="justify-center text-primary">
                        <Link href="/notifications">View all notifications</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* User Menu */}
                  <UserMenu 
                    userName={user?.name || "User"} 
                    userEmail={user?.email || undefined}
                    avatarUrl={user?.image || undefined}
                    onSignOut={handleSignOut}
                  />
                </>
              ) : (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-md">
                    <div className="flex flex-col space-y-4 py-4">
                      <h3 className="text-lg font-semibold">Sign in to your account</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred sign in method to access your DeFi Risk Intelligence dashboard.
                      </p>
                      
                      <div className="flex flex-col gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start" 
                          onClick={() => handleSignIn("google")}
                          disabled={isLoggingIn}
                        >
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          Continue with Google
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleSignIn("github")}
                          disabled={isLoggingIn}
                        >
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                              fill="currentColor"
                            />
                          </svg>
                          Continue with GitHub
                        </Button>
                        
                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="default" 
                          className="w-full"
                          onClick={() => router.push("/auth/signin")}
                        >
                          Email Sign In
                        </Button>
                      </div>
                      
                      <div className="mt-4 text-center text-sm">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                          Privacy Policy
                        </Link>.
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-16">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              href="/dashboard" 
              className="flex items-center px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/projects" 
              className="flex items-center px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/analysis-history" 
              className="flex items-center px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analysis
            </Link>
            <Link 
              href="/search" 
              className="flex items-center px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleSearch();
              }}
            >
              Search
            </Link>
            {isAuthenticated && (
              <Link 
                href="/notifications" 
                className="flex items-center px-4 py-2 rounded-md hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 h-5 w-5 rounded-full bg-primary text-xs font-semibold flex items-center justify-center text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}
          </nav>
        </div>
      )}
      
      {/* Error display */}
      {error && (
        <div className="fixed top-16 left-0 right-0 z-50 animate-in slide-in-from-top">
          <Alert variant="destructive" className="rounded-none border-x-0">
            <AlertCircle className="h-4 w-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <AlertTitle>{error.title}</AlertTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => setError(null)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <AlertDescription className="mt-1">
                <div className="text-sm">{error.message}</div>
                <div className="text-xs mt-1 flex justify-between">
                  <span>Error Code: {error.code}</span>
                  <span>
                    {error.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}