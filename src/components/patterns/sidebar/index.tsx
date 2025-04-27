"use client"

import { SidebarContent } from './sidebar-content';
import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';
import { SidebarItem } from './sidebar-item';
import { SidebarOverlay } from './sidebar-overlay';
import { SidebarRail } from './sidebar-rail';
import { SidebarRoot } from './sidebar-root';
import { SidebarSection } from './sidebar-section';
import { SidebarTrigger } from './sidebar-trigger';

export const Sidebar = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Rail: SidebarRail,
  Trigger: SidebarTrigger,
  Item: SidebarItem,
  Section: SidebarSection,
  Overlay: SidebarOverlay,
};

// Also export individual components for direct imports
export {
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarItem, SidebarOverlay,
  SidebarRail,
  SidebarRoot, SidebarSection, SidebarTrigger
};
