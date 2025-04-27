"use client"

import { Sidebar } from "@/components/patterns/sidebar";
import { useSidebarContext } from '@/contexts/sidebar-context';
import { cn } from '@/utils/classnames';
import {
  AlertTriangle,
  BarChart3,
  FileAudio,
  FileSearch,
  FileText,
  History,
  Home,
  Lightbulb,
  LineChart,
  PlusCircle,
  Settings,
  TrendingUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from 'react';
import styles from './AppSidebar.module.css';
import animations from './AppSidebarAnimations.module.css';

export function AppSidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebarContext();

  // Add keyboard shortcut for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

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
  ];

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
  ];

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
  ];

  const settingsItems = [
    {
      href: "/settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <Sidebar.Root 
      expanded={isOpen} 
      open={isOpen} 
      onOverlayClick={toggleSidebar}
    >
      <Sidebar.Header collapsed={!isOpen}>
        <div className={cn(styles.logo, animations.logoTransition)}>
          <LineChart className={cn(styles.logoIcon, isOpen && animations.logoSpin)} />
          {isOpen && <span className={styles.logoText}>DeFi Risk Intel</span>}
        </div>
        <Sidebar.Trigger isOpen={isOpen} onToggle={toggleSidebar} />
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Section title="Projects" isOpen={isOpen}>
          {projectItems.map((item, index) => (
            <Sidebar.Item
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              isOpen={isOpen}
              itemIndex={index}
            />
          ))}
        </Sidebar.Section>

        <Sidebar.Section title="Analysis" isOpen={isOpen}>
          {analysisItems.map((item, index) => (
            <Sidebar.Item
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              badge={item.badge ? 
                <span className={cn(item.badge === "New" && animations.badgePulse)}>
                  {item.badge}
                </span> : undefined}
              isActive={pathname === item.href}
              isOpen={isOpen}
              itemIndex={index}
            />
          ))}
        </Sidebar.Section>

        <Sidebar.Section title="Resources" isOpen={isOpen}>
          {resourceItems.map((item, index) => (
            <Sidebar.Item
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              isOpen={isOpen}
              itemIndex={index}
            />
          ))}
        </Sidebar.Section>

        <Sidebar.Section title="Settings" isOpen={isOpen}>
          {settingsItems.map((item, index) => (
            <Sidebar.Item
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              isOpen={isOpen}
              itemIndex={index}
            />
          ))}
        </Sidebar.Section>
      </Sidebar.Content>

      {isOpen && (
        <Sidebar.Footer>
          <div className={cn(styles.footerCard, animations.cardHover)}>
            <div className={styles.footerCardHeader}>
              <Lightbulb className={cn(styles.footerCardIcon, animations.tipIconBounce)} />
              <span className={styles.footerCardTitle}>Pro Tip</span>
            </div>
            <p className={styles.footerCardText}>
              Use keyboard shortcut <kbd className={styles.footerCardKbd}>Ctrl+B</kbd> to toggle the sidebar.
            </p>
          </div>
        </Sidebar.Footer>
      )}

      <Sidebar.Rail onResize={toggleSidebar} />
    </Sidebar.Root>
  );
}