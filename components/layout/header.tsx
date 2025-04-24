"use client"

import { SignInButton } from "@/components/features/auth/sign-in-button"
import { Button } from "@/components/ui/button"
import { useNotificationContext } from "@/contexts/features/notification-context"
import { useSearchContext } from "@/contexts/search-context"
import { useSidebarContext } from "@/contexts/sidebar-context"
import { useAuth } from "@/hooks/use-auth"
import { Menu, Search, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Notifications } from "./notifications"

export function Header() {
  const { toggleSidebar } = useSidebarContext()
  const { toggleSearch } = useSearchContext()
  const { unreadCount } = useNotificationContext()
  const { user, status, isAuthenticated, signOut } = useAuth()
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">DeFi Risk Intelligence</span>
          </Link>
        </div>
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <Link href="/profile">
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name || "User"} 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  )
}