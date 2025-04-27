# Sidebar Pattern

A composable sidebar pattern that provides a flexible and reusable sidebar implementation with responsive behavior.

## Features

- Responsive design that works on mobile and desktop
- Collapsible/expandable behavior
- Customizable header, content, and footer sections
- Resizable via drag handle
- Accessible keyboard navigation
- Smooth animations with reduced motion support

## Components

The sidebar pattern consists of the following components:

- `Sidebar.Root` - The main container component
- `Sidebar.Header` - The header section, typically contains logo and toggle button
- `Sidebar.Content` - The main content area, typically contains navigation items
- `Sidebar.Footer` - The footer section, optional
- `Sidebar.Rail` - The resize handle for adjusting sidebar width
- `Sidebar.Trigger` - The toggle button for opening/closing the sidebar
- `Sidebar.Item` - A navigation item with icon, label, and optional badge
- `Sidebar.Section` - A grouping of navigation items with a title

## Usage

```tsx
import { Sidebar } from "@/components/patterns/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { Home, Settings } from "lucide-react";

export function MyApp() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <MySidebar />
        <main className="flex-1 p-4">
          {/* Main content */}
        </main>
      </div>
    </SidebarProvider>
  );
}

function MySidebar() {
  const { isOpen, toggleSidebar } = useSidebarContext();
  
  return (
    <Sidebar.Root expanded={isOpen} open={isOpen}>
      <Sidebar.Header collapsed={!isOpen}>
        <div className="flex items-center gap-2">
          <Logo />
          {isOpen && <span className="font-bold">My App</span>}
        </div>
        <Sidebar.Trigger isOpen={isOpen} onToggle={toggleSidebar} />
      </Sidebar.Header>
      
      <Sidebar.Content>
        <Sidebar.Section title="Main">
          <Sidebar.Item
            href="/"
            icon={<Home className="h-5 w-5" />}
            title="Dashboard"
            isActive={true}
          />
          <Sidebar.Item
            href="/settings"
            icon={<Settings className="h-5 w-5" />}
            title="Settings"
            isActive={false}
          />
        </Sidebar.Section>
      </Sidebar.Content>
      
      {isOpen && (
        <Sidebar.Footer>
          <div className="p-2 bg-muted rounded">
            Footer content
          </div>
        </Sidebar.Footer>
      )}
      
      <Sidebar.Rail onResize={toggleSidebar} />
    </Sidebar.Root>
  );
}
```

## Props

### Sidebar.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | boolean | `true` | Whether the sidebar is expanded or collapsed |
| `open` | boolean | `false` | Whether the sidebar is open on mobile |
| `children` | ReactNode | - | The sidebar content |
| `className` | string | - | Additional CSS classes |

### Sidebar.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | boolean | `false` | Whether the header is in collapsed state |
| `children` | ReactNode | - | The header content |
| `className` | string | - | Additional CSS classes |

### Sidebar.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The content |
| `className` | string | - | Additional CSS classes |

### Sidebar.Footer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The footer content |
| `className` | string | - | Additional CSS classes |

### Sidebar.Rail

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onResize` | (e: React.MouseEvent) => void | - | Callback when rail is clicked/dragged |
| `className` | string | - | Additional CSS classes |

### Sidebar.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | `false` | Whether the sidebar is open |
| `onToggle` | () => void | - | Callback when trigger is clicked |
| `className` | string | - | Additional CSS classes |

### Sidebar.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | string | - | Navigation URL |
| `icon` | ReactNode | - | Icon element |
| `title` | string | - | Item title |
| `badge` | string | - | Optional badge text |
| `isActive` | boolean | `false` | Whether the item is active |

### Sidebar.Section

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Section title |
| `children` | ReactNode | - | Section content (typically SidebarItems) |

## Customization

The sidebar pattern can be customized through:

1. **CSS Modules**: Override styles in `sidebar.module.css`
2. **Animations**: Customize animations in `SidebarAnimations.module.css`
3. **Composition**: Build your own sidebar implementation using the pattern components

## Accessibility

The sidebar pattern includes the following accessibility features:

- Proper ARIA attributes for state management
- Screen reader support with descriptive labels
- Keyboard navigation
- Reduced motion support for animations

## Implementation Notes

- The sidebar uses CSS transitions for smooth animations
- Media queries handle responsive behavior
- The context provides state management for open/closed state
- The pattern is designed to be used with the `SidebarProvider` context