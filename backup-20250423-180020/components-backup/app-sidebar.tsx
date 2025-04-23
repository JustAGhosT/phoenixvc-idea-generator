"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  History,
  PlusCircle,
  Settings,
  FileAudio,
  TrendingUp,
  AlertTriangle,
  LineChart,
  FileSearch,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const items = [
    {
      href: "/",
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/editor/new",
      title: "New Project",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      href: "/risk-analysis",
      title: "Risk Intelligence",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      href: "/compare",
      title: "Compare Projects",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/templates",
      title: "Analysis Templates",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/analysis-history",
      title: "Analysis History",
      icon: <FileSearch className="h-5 w-5" />,
    },
    {
      href: "/changes",
      title: "Change History",
      icon: <History className="h-5 w-5" />,
    },
    {
      href: "/audio-logs",
      title: "Audio Notes",
      icon: <FileAudio className="h-5 w-5" />,
    },
    {
      href: "/scaling",
      title: "Scaling Strategy",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      href: "/settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">DeFi Risk Intel</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>{session?.user?.name || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signout">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ModeToggle />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
