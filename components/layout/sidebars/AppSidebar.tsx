"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Home,
  Lightbulb,
  Menu,
  Rocket,
  Settings,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface SidebarItem {
  href: string;
  title: string;
  icon: ReactNode;
  badge?: string | number;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  toggleCollapsed?: () => void;
  mobile?: boolean;
  className?: string;
  logo?: ReactNode;
  footer?: ReactNode;
}

export function AppSidebar({
  sections,
  collapsed = false,
  toggleCollapsed,
  mobile = false,
  className,
  logo,
  footer
}: SidebarProps) {
  const pathname = usePathname();

  // Default navigation items if none provided
  const defaultSections: SidebarSection[] = [
    {
      items: [
        {
          href: "/dashboard",
          title: "Dashboard",
          icon: <Home className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Ideation",
      items: [
        {
          href: "/ideas",
          title: "Ideas",
          icon: <Lightbulb className="h-5 w-5" />,
        },
        {
          href: "/projects",
          title: "Projects",
          icon: <Rocket className="h-5 w-5" />,
        },
        {
          href: "/compare",
          title: "Compare",
          icon: <BarChart3 className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          href: "/settings",
          title: "Settings",
          icon: <Settings className="h-5 w-5" />,
        },
      ],
    },
  ];

  const navSections = sections.length ? sections : defaultSections;

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background",
        collapsed ? "w-[80px]" : "w-[240px]",
        mobile && "w-full",
        className
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        {toggleCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="mr-2"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        )}
        {!collapsed && logo}
      </div>

      <ScrollArea className="flex-1 py-2">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-3 py-2">
            {section.title && !collapsed && (
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    collapsed && "justify-center px-0 py-2"
                  )}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.title}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="ml-auto text-xs font-medium text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>

      {footer && <div className="border-t p-4">{footer}</div>}
    </div>
  );
}