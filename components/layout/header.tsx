"use client"

import { UserMenu } from "@/components/dashboard/UserMenu"
import { SignInButton } from "@/components/features/auth/sign-in-button"
import { Button } from "@/components/ui/button"
import { useNotificationContext } from "@/contexts/features/notification-context"
import { useSearchContext } from "@/contexts/search-context"
import { useSidebarContext } from "@/contexts/sidebar-context"
import { useAuth } from "@/hooks/use-auth"
import { Menu, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Notifications } from "./notifications"

export function Header() {
  const { toggleSidebar } = useSidebarContext()
  const { toggleSearch } = useSearchContext()
  const { unreadCount } = useNotificationContext()
  const { user, status, isAuthenticated, signOut } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  
  // Track scroll position to add background blur when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])
  
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">DeFi Risk Intelligence</span>
            </Link>
          </div>
          
          {/* Center navigation - you can add more nav items here */}
          <nav className="hidden md:flex items-center space-x-1">
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
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Notifications />
            
            {isAuthenticated ? (
              <UserMenu 
                userName={user?.name || "User"} 
                userEmail={user?.email || undefined}
                avatarUrl={user?.image || undefined}
                onSignOut={handleSignOut}
              />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}