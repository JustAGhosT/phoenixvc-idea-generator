"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Lightbulb, 
  BookOpen, 
  Settings, 
  Users, 
  Rocket,
  FileText
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function MainNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      title: "Ideas",
      href: "/ideas",
      icon: <Lightbulb className="h-4 w-4 mr-2" />,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: <Rocket className="h-4 w-4 mr-2" />,
    },
    {
      title: "Templates",
      href: "/templates",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
    {
      title: "Knowledge Base",
      href: "/knowledge",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
    {
      title: "Team",
      href: "/team",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}