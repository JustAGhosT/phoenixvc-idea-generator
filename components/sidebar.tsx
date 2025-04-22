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
  FileSearch,
  Lightbulb,
  LineChart,
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()

  const projectItems = [
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
      href: "/compare",
      title: "Compare Projects",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ]

  const analysisItems = [
    {
      href: "/risk-analysis",
      title: "Risk Intelligence",
      icon: <AlertTriangle className="h-5 w-5" />,
      badge: "New",
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
  ]

  const resourceItems = [
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
  ]

  const settingsItems = [
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
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectItems.map((item) => (
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
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analysisItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href} className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-primary text-primary-foreground text-xs">{item.badge}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
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
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span className="font-medium">Pro Tip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Use keyboard shortcut <kbd className="rounded bg-muted-foreground/20 px-1">Ctrl+B</kbd> to toggle the
            sidebar.
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
