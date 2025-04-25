# StatCard Component Migration

## Current Implementation

Currently, the StatCard component has an inconsistent implementation:

1. **Dashboard StatCard** (`components/dashboard/StatCard.tsx`)
   - Used to display statistics on the dashboard
   - Has a basic interface with title, value, and description
   - The implementation doesn't include an icon prop, but it's being passed in the dashboard page
   - No support for trend indicators
   - Fixed styling with limited customization
   - No loading state or animation

2. **Analytics StatCard** (`components/analytics/stat-box.tsx`)
   - Similar functionality but different naming and props
   - Includes support for icons and color variants
   - Used in analytics pages
   - Different styling approach

## Migration Plan

### Target Location
- New unified component: `components/common/cards/StatCard.tsx`
- LESS module: `components/common/cards/StatCard.less`

### Directory Structure

```
components/
└── common/
    └── cards/
        ├── index.ts
        ├── StatCard.tsx
        ├── StatCard.less
        └── StatCard.test.tsx
```

### Standardized Interface

The new component will use a standardized interface that supports all use cases:

```typescript
export type StatCardVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";

export interface StatCardTrend {
  value: number;
  label: string;
  direction: "up" | "down" | "neutral";
  isGood?: boolean; // Whether the trend is positive (up can be bad for some metrics)
}

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: string | React.ReactNode;
  trend?: StatCardTrend;
  variant?: StatCardVariant;
  loading?: boolean;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  onClick?: () => void;
  compact?: boolean;
  tooltipContent?: React.ReactNode;
}
```

### LESS Module Design

The LESS module will include styles for:
- Card container with proper padding, borders, and shadows
- Typography for title, value, and description
- Icon placement and sizing
- Trend indicator with directional arrows
- Color variants (primary, success, warning, danger, info)
- Loading state with skeleton animation
- Hover and focus states for interactive cards
- Compact variant for space-constrained layouts
- Responsive behavior for different screen sizes

### Implementation Strategy

1. Create the LESS module with styling for all variants
2. Implement the new StatCard component with all features
3. Create unit tests and Storybook stories
4. Update imports in dashboard and analytics pages
5. Test thoroughly in all contexts
6. Remove old implementations once migration is complete

### Usage Examples

#### Basic Usage

```tsx
<StatCard 
  title="Total Ideas" 
  value={42} 
  description="Ideas in your portfolio" 
/>
```

#### With Icon

```tsx
<StatCard 
  title="Approved Ideas" 
  value={15} 
  description="Ideas marked as approved" 
  icon="check"
/>
```

#### With Custom Icon

```tsx
<StatCard 
  title="Active Projects" 
  value={8} 
  description="Projects in progress" 
  icon={<Rocket className="h-5 w-5 text-blue-500" />}
/>
```

#### With Trend

```tsx
<StatCard 
  title="Avg. Confidence" 
  value="85.5%" 
  description="Average idea confidence" 
  icon="chart"
  trend={{
    value: 12.5,
    label: "since last month",
    direction: "up",
    isGood: true
  }}
/>
```

#### With Color Variant

```tsx
<StatCard 
  title="Critical Issues" 
  value={3} 
  description="Issues requiring attention" 
  icon="alert-circle"
  variant="danger"
/>
```

#### Loading State

```tsx
<StatCard 
  title="Revenue" 
  value="--" 
  description="Loading data..." 
  loading={true}
/>
```

#### Compact Version

```tsx
<StatCard 
  title="New Users" 
  value={24} 
  compact={true}
  variant="primary"
/>
```

## Accessibility Considerations

- Use semantic HTML elements for structure
- Ensure sufficient color contrast for all variants
- Add proper ARIA attributes for interactive cards
- Include proper focus states for clickable cards
- Ensure icons have appropriate alt text or aria-hidden
- Use proper heading hierarchy for title
- Ensure loading states are properly announced to screen readers

## Performance Considerations

- Minimize re-renders with proper React patterns
- Use CSS for animations rather than JavaScript where possible
- Optimize icon loading and rendering
- Consider memoization for complex calculations
- Ensure efficient rendering when many StatCards are displayed together
- Use CSS variables for theming to reduce style recalculations

## Unit Testing Strategy

Tests will cover:
- Rendering with different configurations
- Icon rendering (both string and ReactNode)
- Trend indicator rendering and calculations
- Color variant styling
- Loading state behavior
- Accessibility requirements
- Interactive behavior (onClick)
- Responsive behavior

## Migration Checklist

- [ ] **Identification Phase**
  - [x] Identify all instances of the component in the codebase
  - [x] List all files where the component is used
  - [x] Document the current props interface and behavior
  - [x] Identify variations in usage

- [ ] **Design Phase**
  - [x] Design a standardized interface
  - [x] Identify the appropriate directory
  - [x] Create LESS module structure
  - [x] Plan necessary refactoring

- [ ] **Implementation Phase**
  - [ ] Create the LESS module
  - [ ] Create the unified component
  - [ ] Implement icon support
  - [ ] Implement trend support
  - [ ] Implement color variants
  - [ ] Add loading state
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in dashboard page
  - [ ] Update imports in analytics pages
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

- Need to support both string and ReactNode icons
- Consider adding different color variants
- Add support for trends (up/down indicators)
- Ensure consistent sizing across different content lengths
- Consider adding loading state
- Add proper ARIA attributes for accessibility
- Support for tooltips to provide additional context
- Consider adding interactive behavior (onClick)
- Add support for compact variant for dense layouts
- Support for value formatting (prefix, suffix)
- Consider adding animation for value changes

## Timeline and Resources

**Estimated Timeline:**
- Component structure and interface design: 0.5 day
- LESS module implementation: 0.5 day
- Component implementation: 1 day
- Testing and refinement: 1 day
- Migration of existing usages: 1 day
- Documentation and cleanup: 0.5 day

**Required Resources:**
- 1 Frontend developer (primary)
- Design review for styling consistency
- QA support for testing in different contexts

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Inconsistent styling across variants | Medium | Create a design system token map for consistent styling |
| Breaking existing functionality | High | Create adapter components for backward compatibility |
| Performance issues with many cards | Medium | Implement virtualization for lists of StatCards |
| Icon loading performance | Low | Use icon sprite or optimize SVG loading |

## Success Criteria

The migration will be considered successful when:
1. All existing StatCard and stat-box usages are migrated to the new component
2. All variants and features work correctly in all contexts
3. The component is visually consistent with the design system
4. The component is fully accessible
5. All tests pass, including interaction tests
6. The old implementations are safely removed