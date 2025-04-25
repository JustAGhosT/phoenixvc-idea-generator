"use client";

import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BarChart3,
  ChevronLeft,
  CreditCard,
  FileAudio,
  FileSearch,
  FileText,
  History,
  Home,
  Lightbulb,
  LineChart,
  PlusCircle,
  Settings,
  Users,
  Wallet
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const projectItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/projects/new",
      title: "New Project",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      href: "/dashboard/compare",
      title: "Compare Projects",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  const analysisItems = [
    {
      href: "/dashboard/risk",
      title: "Risk Intelligence",
      icon: <AlertTriangle className="h-5 w-5" />,
      badge: "New",
    },
    {
      href: "/dashboard/templates",
      title: "Analysis Templates",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/dashboard/history",
      title: "Analysis History",
      icon: <FileSearch className="h-5 w-5" />,
    },
  ];

  const resourceItems = [
    {
      href: "/dashboard/changes",
      title: "Change History",
      icon: <History className="h-5 w-5" />,
    },
    {
      href: "/dashboard/audio-notes",
      title: "Audio Notes",
      icon: <FileAudio className="h-5 w-5" />,
    },
    {
      href: "/dashboard/wallet",
      title: "Wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      href: "/dashboard/transactions",
      title: "Transactions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      href: "/dashboard/team",
      title: "Team",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  const settingsItems = [
    {
      href: "/dashboard/settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Check if a route is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  // Render a sidebar menu item
  const renderMenuItem = (item: {
    href: string;
    title: string;
    icon: React.ReactNode;
    badge?: string;
  }) => {
    const active = isActive(item.href);
    
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {item.icon}
        <span>{item.title}</span>
        {item.badge && (
          <Badge className="ml-auto bg-primary text-primary-foreground text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center px-4 border-b justify-between">
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">DeFi Risk Intel</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onClose}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Projects Group */}
        <div className="px-3 mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Projects
          </h3>
          <nav className="space-y-1">
            {projectItems.map(renderMenuItem)}
          </nav>
        </div>

        {/* Analysis Group */}
        <div className="px-3 mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Analysis
          </h3>
          <nav className="space-y-1">
            {analysisItems.map(renderMenuItem)}
          </nav>
        </div>

        {/* Resources Group */}
        <div className="px-3 mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Resources
          </h3>
          <nav className="space-y-1">
            {resourceItems.map(renderMenuItem)}
          </nav>
        </div>

        {/* Settings Group */}
        <div className="px-3">
          <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Settings
          </h3>
          <nav className="space-y-1">
            {settingsItems.map(renderMenuItem)}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Pro Tip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Use keyboard shortcut <kbd className="rounded bg-muted-foreground/20 px-1">Ctrl+B</kbd> to toggle the
            sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}