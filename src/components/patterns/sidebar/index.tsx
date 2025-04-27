"use client"

import { SidebarContent } from './sidebar-content';
import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';
import { SidebarRail } from './sidebar-rail';
import { SidebarRoot } from './sidebar-root';
import { SidebarTrigger } from './sidebar-trigger';
import { SidebarItem } from './sidebar-item';
import { SidebarSection } from './sidebar-section';

export const Sidebar = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Rail: SidebarRail,
  Trigger: SidebarTrigger,
  Item: SidebarItem,
  Section: SidebarSection,
};

// Also export individual components for direct imports
export {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarRoot,
  SidebarTrigger,
  SidebarItem,
  SidebarSection
};