# Navigation Components Migration

## Current Implementations

Currently, there are multiple navigation-related components scattered across the codebase:

1. **Main Navigation** (`components/navigation/main-nav.tsx`)
   - Primary navigation component
   - Used in the main application header
   - Limited configurability
   - Hardcoded navigation items

2. **Mobile Navigation** (`components/navigation/mobile-nav.tsx`)
   - Separate implementation for mobile devices
   - Duplicates much of the main navigation logic
   - Different styling and behavior

3. **Breadcrumbs** (`components/navigation/breadcrumbs.tsx`)
   - Inconsistent implementation across pages
   - Sometimes integrated into headers, sometimes standalone
   - Limited configurability

4. **Tab Navigation** (`components/ui/tabs.tsx`)
   - Used for in-page navigation
   - Different styling from main navigation
   - Inconsistent usage patterns

## Migration Plan

### Target Location
- New unified components:
  - `components/common/navigation/MainNav.tsx`
  - `components/common/navigation/Breadcrumbs.tsx`
  - `components/common/navigation/TabNav.tsx`
  - `components/common/navigation/NavLink.tsx`
  - `components/common/navigation/NavMenu.tsx`

### Directory Structure

```
components/
└── common/
    └── navigation/
        ├── index.ts
        ├── MainNav.tsx
        ├── MainNav.less
        ├── Breadcrumbs.tsx
        ├── Breadcrumbs.less
        ├── TabNav.tsx
        ├── TabNav.less
        ├── NavLink.tsx
        ├── NavLink.less
        ├── NavMenu.tsx
        ├── NavMenu.less
        └── navigation.test.tsx
```

### Standardized Interfaces

The new components will use standardized interfaces that support all use cases:

```typescript
// Common types
export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: NavItem[]; // For dropdown menus
  badge?: string | number;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "danger";
  external?: boolean; // For external links
}

// MainNav.tsx
export interface MainNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  variant?: "default" | "transparent" | "bordered";
  position?: "static" | "sticky" | "fixed";
  mobileBreakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

// Breadcrumbs.tsx
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode | string;
  maxItems?: number;
  homeIcon?: React.ReactNode;
  showHomeIcon?: boolean;
  onlyShowMobile?: boolean;
}

// TabNav.tsx
export interface TabNavProps {
  items: NavItem[];
  className?: string;
  variant?: "default" | "underlined" | "pills";
  size?: "sm" | "md" | "lg";
  alignment?: "start" | "center" | "end";
  fullWidth?: boolean;
  scrollable?: boolean;
  onChange?: (item: NavItem) => void;
}

// NavLink.tsx
export interface NavLinkProps extends NavItem {
  className?: string;
  activeClassName?: string;
  disabledClassName?: string;
  variant?: "default" | "button" | "text";
  size?: "sm" | "md" | "lg";
  exact?: boolean; // For exact path matching
}

// NavMenu.tsx
export interface NavMenuProps {
  trigger: React.ReactNode;
  items: NavItem[];
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  onOpenChange?: (open: boolean) => void;
}
```

### LESS Module Design

The LESS modules will include styles for:
- Consistent navigation styling across all components
- Responsive behavior for different screen sizes
- Mobile-friendly navigation with proper touch targets
- Dropdown and flyout menu styling
- Active, hover, and focus states for interactive elements
- Proper spacing and alignment based on design system tokens
- Breadcrumb separators and truncation
- Tab navigation with different style variants
- Badge styling for navigation items
- Proper z-index management for dropdown menus

### Implementation Strategy

1. Create the LESS modules for all navigation components
2. Implement the core navigation components with all features
3. Create unit tests and Storybook stories
4. Update imports in layout and page files
5. Test thoroughly in all contexts
6. Remove old implementations once migration is complete

### Usage Examples

#### Main Navigation

```tsx
<MainNav
  items={[
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      isActive: pathname === "/dashboard"
    },
    {
      label: "Ideas",
      href: "/ideas",
      icon: <Lightbulb className="h-5 w-5" />,
      badge: 3,
      badgeVariant: "primary"
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <Rocket className="h-5 w-5" />
    },
    {
      label: "More",
      icon: <MoreHorizontal className="h-5 w-5" />,
      children: [
        {
          label: "Settings",
          href: "/settings",
          icon: <Settings className="h-5 w-5" />
        },
        {
          label: "Help",
          href: "/help",
          icon: <HelpCircle className="h-5 w-5" />
        }
      ]
    }
  ]}
  logo={<Logo />}
  actions={
    <div className="flex items-center gap-2">
      <NotificationsButton />
      <UserMenu />
    </div>
  }
  position="sticky"
  variant="bordered"
/>
```

#### Breadcrumbs

```tsx
<Breadcrumbs
  items={[
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Projects", href: "/projects" },
    { label: "Project Name", isActive: true }
  ]}
  separator={<ChevronRight className="h-4 w-4" />}
  showHomeIcon
  maxItems={4}
/>
```

#### Tab Navigation

```tsx
<TabNav
  items={[
    { label: "Overview", href: `/projects/${id}`, isActive: tab === "overview" },
    { label: "Tasks", href: `/projects/${id}/tasks`, isActive: tab === "tasks" },
    { label: "Team", href: `/projects/${id}/team`, isActive: tab === "team" },
    { label: "Documents", href: `/projects/${id}/documents`, isActive: tab === "documents" },
    { label: "Settings", href: `/projects/${id}/settings`, isActive: tab === "settings" }
  ]}
  variant="underlined"
  scrollable
/>
```

#### NavLink

```tsx
<NavLink
  label="View Documentation"
  href="https://docs.example.com"
  icon={<ExternalLink className="h-4 w-4" />}
  external
  variant="button"
/>
```

#### NavMenu

```tsx
<NavMenu
  trigger={
    <Button variant="ghost" size="sm">
      <MoreVertical className="h-4 w-4" />
    </Button>
  }
  items={[
    { label: "Edit", icon: <Edit className="h-4 w-4" />, onClick: handleEdit },
    { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onClick: handleDuplicate },
    { label: "Archive", icon: <Archive className="h-4 w-4" />, onClick: handleArchive },
    { label: "Delete", icon: <Trash className="h-4 w-4" />, onClick: handleDelete }
  ]}
  align="end"
/>
```

## Accessibility Considerations

- Use semantic HTML elements (nav, ul, li, a) for navigation structure
- Ensure keyboard navigation works properly for all interactive elements
- Add proper ARIA attributes for navigation landmarks
- Implement proper focus management for dropdown menus
- Ensure sufficient color contrast for all navigation items
- Add proper ARIA attributes for current/active navigation items
- Support screen reader announcements for state changes
- Implement proper keyboard shortcuts for common navigation actions
- Ensure dropdown menus are accessible via keyboard
- Add proper focus trapping for mobile navigation

## Performance Considerations

- Use CSS for dropdown animations instead of JavaScript where possible
- Implement proper cleanup for event listeners
- Optimize rendering of large navigation structures
- Use React.memo for navigation items to prevent unnecessary re-renders
- Implement efficient active state management
- Minimize DOM elements for better performance
- Use CSS variables for theming to reduce style recalculations
- Consider code-splitting for complex navigation components

## Unit Testing Strategy

Tests will cover:
- Rendering with different configurations
- Mobile responsive behavior
- Dropdown menu functionality
- Active state management
- Accessibility requirements
- Event handling (clicks, keyboard navigation)
- Proper rendering of icons and badges
- Breadcrumb truncation behavior
- Tab navigation scrolling behavior

## Migration Checklist

- [x] **Identification Phase**
  - [x] Identify all navigation components in the codebase
  - [x] List all files where these components are used
  - [x] Document the current props and behavior
  - [x] Identify variations in usage

- [x] **Design Phase**
  - [x] Design standardized interfaces
  - [x] Identify the appropriate directories
  - [x] Create LESS module structure
  - [x] Plan necessary refactoring

- [ ] **Implementation Phase**
  - [ ] Create the LESS modules
  - [ ] Create MainNav component
  - [ ] Create Breadcrumbs component
  - [ ] Create TabNav component
  - [ ] Create NavLink component
  - [ ] Create NavMenu component
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in layout components
  - [ ] Update imports in header components
  - [ ] Update imports in page components
  - [ ] Test in all contexts
  - [ ] Address any issues found during testing

- [ ] **Documentation Phase**
  - [ ] Add JSDoc comments
  - [ ] Create usage examples
  - [ ] Document props
  - [ ] Add accessibility documentation
  - [ ] Document performance considerations

- [ ] **Cleanup Phase**
  - [ ] Verify all uses are working
  - [ ] Remove old components
  - [ ] Remove unused imports
  - [ ] Clean up any temporary code

- [ ] **Review Phase**
  - [ ] Conduct code review
  - [ ] Check for performance issues
  - [ ] Verify accessibility
  - [ ] Ensure documentation is complete
  - [ ] Final testing in all contexts

## Notes and Considerations

- Need to support both desktop and mobile views
- Consider adding animation for dropdown menus
- Ensure keyboard navigation works correctly
- Add proper ARIA attributes for accessibility
- Consider adding different visual variants
- Ensure consistent styling with the design system
- Support for nested navigation items
- Consider adding support for custom item rendering
- Add support for badges on navigation items
- Support for external links (with proper indicators)
- Consider adding support for dynamic navigation based on permissions
- Ensure proper handling of long navigation labels
- Consider adding support for search within navigation

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 1 day
- LESS module implementation: 1 day
- Component implementation: 2 days
- Testing and refinement: 1-2 days
- Migration of existing usages: 1-2 days
- Documentation and cleanup: 1 day

**Required Resources:**
- 1 Frontend developer (primary)
- 1 Designer (consultation for styling review)
- QA support for testing in different contexts
- Accessibility expert for review

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing navigation patterns | High | Create adapter components for backward compatibility |
| Mobile responsiveness issues | High | Extensive testing on various devices and screen sizes |
| Dropdown menu positioning issues | Medium | Use a reliable positioning library (e.g., Floating UI) |
| Accessibility regressions | High | Conduct thorough accessibility testing and audits |
| Performance issues with complex menus | Medium | Optimize rendering and implement virtualization if needed |

## Success Criteria

The migration will be considered successful when:
1. All existing navigation components are migrated to the new components
2. Navigation works correctly in all contexts (desktop, mobile, tablets)
3. Navigation is fully accessible via keyboard and screen readers
4. Performance is equal to or better than the original implementations
5. The components are visually consistent with the design system
6. All tests pass, including interaction and accessibility tests
7. The old implementations are safely removed