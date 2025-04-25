# Layout Components Migration

## Current Implementations

Currently, there are several layout-related components scattered across the codebase:

1. **Root Layout Components**
   - `components/layout/root-client-layout.tsx` - Main application wrapper
   - `components/layout/DashboardLayout.tsx` - Dashboard-specific layout
   - Various page-specific layouts with inconsistent implementations

2. **Layout Wrappers**
   - Different wrapper components used for consistent page layouts
   - Inconsistent usage across the application
   - Varying approaches to padding, margins, and responsive behavior

3. **Header and Footer Components**
   - Multiple implementations with different styling and functionality
   - Inconsistent props and behavior across pages
   - Duplicated code for common patterns like breadcrumbs

## Migration Plan

### Target Location
- New unified components:
  - `components/layout/wrappers/PageWrapper.tsx`
  - `components/layout/wrappers/ContentWrapper.tsx`
  - `components/layout/wrappers/SectionWrapper.tsx`
  - `components/layout/headers/PageHeader.tsx`
  - `components/layout/footers/PageFooter.tsx`
- LESS modules for each component

### Directory Structure

```
components/
└── layout/
    ├── wrappers/
    │   ├── index.ts
    │   ├── PageWrapper.tsx
    │   ├── PageWrapper.less
    │   ├── ContentWrapper.tsx
    │   ├── ContentWrapper.less
    │   ├── SectionWrapper.tsx
    │   ├── SectionWrapper.less
    │   └── wrappers.test.tsx
    ├── headers/
    │   ├── index.ts
    │   ├── PageHeader.tsx
    │   ├── PageHeader.less
    │   └── PageHeader.test.tsx
    └── footers/
        ├── index.ts
        ├── PageFooter.tsx
        ├── PageFooter.less
        └── PageFooter.test.tsx
```

### Standardized Interfaces

The new components will use standardized interfaces that support all use cases:

```typescript
// PageWrapper.tsx
export interface PageWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  showSidebar?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  contentClassName?: string;
  backgroundClassName?: string;
  sidebarPosition?: 'left' | 'right';
  fullHeight?: boolean;
  noMainPadding?: boolean;
}

// ContentWrapper.tsx
export interface ContentWrapperProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  as?: React.ElementType;
  id?: string;
}

// SectionWrapper.tsx
export interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  id?: string;
  as?: React.ElementType;
}

// PageHeader.tsx
export interface Breadcrumb {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface PageHeaderProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  backLink?: { label: string; href: string; icon?: React.ReactNode };
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  sticky?: boolean;
  divider?: boolean;
  compact?: boolean;
}

// PageFooter.tsx
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface PageFooterProps {
  children?: React.ReactNode;
  showCopyright?: boolean;
  companyName?: string;
  links?: FooterLink[];
  className?: string;
  sticky?: boolean;
  variant?: 'light' | 'dark';
  logoComponent?: React.ReactNode;
}
```

### LESS Module Design

The LESS modules will include styles for:
- Consistent layout structure with proper grid and flexbox usage
- Responsive behavior for different screen sizes
- Proper spacing and alignment based on design system tokens
- Header and footer styling with proper positioning options
- Section styling with consistent typography and spacing
- Sidebar integration with proper width management
- Proper z-index management for sticky elements
- Accessibility-focused styling for focus states and landmarks

### Implementation Strategy

1. Create the LESS modules for all layout components
2. Implement the core layout components with all features
3. Create unit tests and Storybook stories
4. Update imports in page files
5. Test thoroughly in all contexts
6. Remove old implementations once migration is complete

### Usage Examples

#### PageWrapper with Sidebar

```tsx
<PageWrapper
  header={<PageHeader title="Dashboard" />}
  sidebar={<AppSidebar sections={navSections} />}
  footer={<PageFooter showCopyright companyName="Phoenix VC" />}
  maxWidth="xl"
  fullHeight
>
  <ContentWrapper>
    {/* Page content */}
  </ContentWrapper>
</PageWrapper>
```

#### Content with Sections

```tsx
<ContentWrapper maxWidth="lg" padding="md">
  <SectionWrapper
    title="Recent Activity"
    description="Your recent actions and updates"
    action={<Button>View All</Button>}
    divider
  >
    <ActivityList activities={activities} />
  </SectionWrapper>
  
  <SectionWrapper
    title="Statistics"
    description="Key metrics for your portfolio"
    className="mt-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Total Ideas" value={42} />
      <StatCard title="Active Projects" value={12} />
      <StatCard title="Completed" value={8} />
    </div>
  </SectionWrapper>
</ContentWrapper>
```

#### Page Header with Breadcrumbs

```tsx
<PageHeader
  title="Project Details"
  description="View and manage project information"
  breadcrumbs={[
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-4 w-4" /> },
    { label: "Projects", href: "/projects" },
    { label: "Project Name" }
  ]}
  actions={
    <div className="flex gap-2">
      <Button variant="outline">Edit</Button>
      <Button>Save</Button>
    </div>
  }
  sticky
  divider
/>
```

#### Collapsible Section

```tsx
<SectionWrapper
  title="Advanced Settings"
  description="Configure advanced options for your project"
  collapsible
  defaultCollapsed
>
  <AdvancedSettingsForm />
</SectionWrapper>
```

## Accessibility Considerations

- Use semantic HTML elements for structure (main, section, header, footer, etc.)
- Add proper ARIA landmarks for screen readers
- Include skip-to-content links for keyboard navigation
- Ensure proper heading hierarchy throughout the layout
- Add proper focus management for interactive elements
- Ensure sufficient color contrast for all text elements
- Provide proper keyboard navigation between layout sections
- Ensure sticky elements don't obscure content for keyboard users

## Performance Considerations

- Minimize DOM nesting to improve rendering performance
- Use CSS Grid and Flexbox for efficient layouts
- Implement proper code-splitting for large page layouts
- Optimize transitions and animations for smooth performance
- Consider using React.memo for static layout components
- Ensure efficient rendering when layout components re-render
- Use CSS variables for theming to reduce style recalculations

## Unit Testing Strategy

Tests will cover:
- Rendering with different configurations
- Responsive behavior
- Proper nesting of layout components
- Collapsible section functionality
- Sticky header and footer behavior
- Accessibility requirements
- Proper rendering of children components
- Proper application of className props

## Migration Checklist

- [x] **Identification Phase**
  - [x] Identify all layout components in the codebase
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
  - [ ] Create PageWrapper component
  - [ ] Create ContentWrapper component
  - [ ] Create SectionWrapper component
  - [ ] Create PageHeader component
  - [ ] Create PageFooter component
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in dashboard pages
  - [ ] Update imports in idea pages
  - [ ] Update imports in project pages
  - [ ] Update imports in settings pages
  - [ ] Update imports in other pages
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

- Need to ensure consistent spacing and alignment across all pages
- Consider adding theme support for different visual styles
- Ensure responsive behavior works correctly on all screen sizes
- Add proper ARIA landmarks for accessibility
- Consider adding animation options for page transitions
- Ensure consistent handling of max-width and padding
- Consider adding skip-to-content links for accessibility
- Support for different sidebar widths and positions
- Consider adding support for multiple content columns
- Ensure proper handling of overflow content
- Support for sticky headers and footers with proper z-index management
- Consider adding support for page-specific background colors or images

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 1 day
- LESS module implementation: 1 day
- Component implementation: 2-3 days
- Testing and refinement: 1-2 days
- Migration of existing usages: 2-3 days (due to widespread usage)
- Documentation and cleanup: 1 day

**Required Resources:**
- 1 Frontend developer (primary)
- 1 Designer (consultation for layout consistency)
- QA support for testing in different contexts
- Accessibility expert for review

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing page layouts | High | Create adapter components for backward compatibility |
| Inconsistent responsive behavior | Medium | Create comprehensive responsive test cases |
| Layout shifts during page transitions | Medium | Implement consistent min-height and content placeholders |
| Z-index conflicts | Medium | Create a z-index management system in the design tokens |
| Performance degradation | Low | Benchmark before and after, optimize rendering |

## Success Criteria

The migration will be considered successful when:
1. All existing page layouts are migrated to the new components
2. Layouts are visually consistent across all pages
3. Responsive behavior works correctly on all screen sizes
4. The components are fully accessible
5. Performance is equal to or better than the original implementations
6. All tests pass, including accessibility and responsive tests
7. The old implementations are safely removed