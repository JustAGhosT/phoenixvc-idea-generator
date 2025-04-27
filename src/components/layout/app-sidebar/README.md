# AppSidebar Component

The `AppSidebar` component is an application-specific implementation of the sidebar pattern for the DeFi Risk Intel application.

## Overview

This component uses the reusable sidebar pattern components to create a consistent navigation experience for the application. It includes:

- Application branding with logo and title
- Navigation sections for different parts of the application
- Visual indicators for active routes
- Responsive behavior for mobile and desktop
- Pro tip section in the footer

## Usage

```tsx
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";

export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
```

## Features

### Responsive Design

- Expands to full width on desktop when open
- Collapses to icon-only view when closed
- Slides in/out on mobile devices
- Automatically adjusts based on screen size

### Navigation Structure

The sidebar organizes navigation into logical sections:

1. **Projects** - Dashboard, new projects, comparisons
2. **Analysis** - Risk intelligence, templates, history
3. **Resources** - Change history, audio notes, scaling strategy
4. **Settings** - Application settings

### Visual Indicators

- Active route highlighting
- "New" badges for recently added features
- Tooltips for collapsed state

### Animations

The sidebar includes smooth animations for:

- Expanding/collapsing transitions
- Mobile slide in/out
- Hover effects on items
- Badge highlights

## Customization

The AppSidebar can be customized through:

1. **CSS Modules**: Modify `AppSidebar.module.css` for component-specific styles
2. **Animations**: Adjust animations in `AppSidebarAnimations.module.css`
3. **Navigation Items**: Update the item arrays in `AppSidebar.tsx`

## Implementation Details

### Context Integration

The AppSidebar uses the `useSidebarContext` hook to:
- Access the current sidebar state (`isOpen`)
- Toggle the sidebar state (`toggleSidebar`)

### Routing Integration

The component uses Next.js's `usePathname` hook to:
- Determine the current route
- Highlight the active navigation item

### Conditional Rendering

- The logo text only appears when the sidebar is expanded
- The footer with pro tips only appears when the sidebar is expanded
- Navigation items show tooltips when the sidebar is collapsed

## Accessibility

The AppSidebar includes:

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Screen reader-only text for icon-only buttons
- Reduced motion support for users who prefer minimal animations

## Related Components

- **Sidebar Pattern** - The base pattern components used by AppSidebar
- **SidebarProvider** - Context provider for sidebar state management
- **AppLayout** - Layout component that uses AppSidebar