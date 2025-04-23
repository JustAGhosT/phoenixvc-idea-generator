"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { getInitials } from "@/lib/utils"

export interface UserProfileProps {
  /**
   * Whether to show the sign out button
   * @default true
   */
  showSignOutButton?: boolean
  
  /**
   * Whether to show the user's roles
   * @default true
   */
  showRoles?: boolean
  
  /**
   * Whether to show the edit profile button
   * @default true
   */
  showEditButton?: boolean
  
  /**
   * Additional CSS classes to apply to the card
   */
  className?: string
}

/**
 * Component that displays the current user's profile information
 */
export function UserProfile({
  showSignOutButton = true,
  showRoles = true,
  showEditButton = true,
  className,
}: UserProfileProps) {
  const { user, roles, signOut } = useAuth()
  const router = useRouter()
  
  if (!user) {
    return null
  }
  
  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }
  
  const handleEditProfile = () => {
    router.push("/profile/edit")
  }
  
  // Get role badge color
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "editor":
        return "default"
      case "viewer":
        return "secondary"
      default:
        return "outline"
    }
  }
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
          <AvatarFallback>{getInitials(user.name || "User")}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{user.name || "Anonymous User"}</CardTitle>
          <CardDescription>{user.email || ""}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        {showRoles && roles.length > 0 && (
          <div className="mt-2">
            <h3 className="text-sm font-medium mb-2">Roles</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge key={role} variant={getRoleBadgeVariant(role)}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {showEditButton && (
          <Button variant="outline" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        )}
        
        {showSignOutButton && (
          <Button variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}