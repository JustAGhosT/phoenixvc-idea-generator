# StatCard Component Migration

## Current Implementation

Previously, the StatCard component had an inconsistent implementation:

1. **Dashboard StatCard** (`components/dashboard/StatCard.tsx`)
   - Used to display statistics on the dashboard
   - Had a basic interface with title, value, and description
   - The implementation didn't include an icon prop, but it was being passed in the dashboard page
   - No support for trend indicators
   - Fixed styling with limited customization
   - No loading state or animation

2. **Analytics StatCard** (`components/analytics/stat-box.tsx`)
   - Similar functionality but different naming and props
   - Included support for icons and color variants
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
        ├── StatCard.test.tsx
        └── StatCard.stories.tsx
```

### Standardized Interface

The new component uses a standardized interface that supports all use cases:

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
  ariaLabel?: string;
}
```

### LESS Module Design

The LESS module includes styles for:
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

1. ✅ Create the LESS module with styling for all variants
2. ✅ Implement the new StatCard component with all features
3. ✅ Create unit tests and Storybook stories
4. ✅ Update imports in dashboard and analytics pages
5. ✅ Remove old implementations once migration is complete

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

The StatCard component implements the following accessibility features:
- Uses semantic HTML elements for structure
- Ensures sufficient color contrast for all variants
- Includes proper ARIA attributes for interactive cards:
  - role="button" for clickable cards
  - aria-labelledby pointing to the title element
  - aria-describedby pointing to the description element
- Keyboard navigation support (Enter and Space keys)
- Provides focus states for clickable cards
- Ensures icons have aria-hidden="true" to prevent screen reader announcement
- Uses proper heading hierarchy for title
- Ensures loading states are properly announced to screen readers
- Provides ariaLabel prop for custom screen reader announcements
- Includes descriptive labels for trend indicators

## Performance Considerations

The StatCard component is optimized for performance:
- Uses CSS for animations rather than JavaScript
- Minimizes re-renders through proper React patterns
- Uses CSS variables for theming to reduce style recalculations
- Optimizes icon loading by supporting both string identifiers and direct ReactNode
- Applies memoization for complex calculations
- Ensures efficient rendering when many StatCards are displayed together
- Uses CSS-based loading animations instead of JavaScript-based ones
- Implements responsive design with minimal CSS
- Avoids unnecessary DOM nesting

## Unit Testing Strategy

The StatCard component has comprehensive tests covering:
- Rendering with different configurations
- Icon rendering (both string and ReactNode)
- Trend indicator rendering and calculations
- Color variant styling
- Loading state behavior
- Accessibility requirements
- Interactive behavior (onClick)
- Keyboard navigation
- Responsive behavior
- Prefix and suffix rendering
- Tooltip functionality

## Migration Checklist

- [x] **Identification Phase**
  - [x] Identify all instances of the component in the codebase
  - [x] List all files where the component is used
  - [x] Document the current props interface and behavior
  - [x] Identify variations in usage

- [x] **Design Phase**
  - [x] Design a standardized interface
  - [x] Identify the appropriate directory
  - [x] Create LESS module structure
  - [x] Plan necessary refactoring

- [x] **Implementation Phase**
  - [x] Create the LESS module
  - [x] Create the unified component
  - [x] Implement icon support
  - [x] Implement trend support
  - [x] Implement color variants
  - [x] Add loading state
  - [x] Add proper TypeScript typing
  - [x] Ensure responsive behavior
  - [x] Add accessibility features
  - [x] Write unit tests
  - [x] Create Storybook stories

- [x] **Migration Phase**
  - [x] Update imports in dashboard page
  - [x] Update imports in analytics pages
  - [x] Test in all contexts
  - [x] Address any issues found during testing

- [x] **Documentation Phase**
  - [x] Add JSDoc comments
  - [x] Create usage examples
  - [x] Document props
  - [x] Add accessibility documentation
  - [x] Document performance considerations

- [x] **Cleanup Phase**
  - [x] Verify all uses are working
  - [x] Remove old components
  - [x] Remove unused imports
  - [x] Clean up any temporary code

- [x] **Review Phase**
  - [x] Conduct code review
  - [x] Check for performance issues
  - [x] Verify accessibility
  - [x] Ensure documentation is complete
  - [x] Final testing in all contexts

## Implementation Details

### Dashboard Migration

The dashboard page has been successfully migrated to use the new unified StatCard component:

```tsx
// app/dashboard/page.tsx
import { StatCard } from "@/components/common/cards/StatCard"; // Updated import path

// ...

<StatCard 
  title="Total Ideas" 
  value={totalIdeas} 
  description="Ideas in your portfolio" 
  icon="lightbulb"
  variant="primary"
/>

<StatCard 
  title="Approved Ideas" 
  value={approvedIdeas} 
  description="Ideas marked as approved" 
  icon="check"
  variant="success"
/>

<StatCard 
  title="Active Projects" 
  value={activeProjects} 
  description="Projects in progress" 
  icon="rocket"
  variant="info"
/>

<StatCard 
  title="Avg. Confidence" 
  value={`${avgConfidence.toFixed(1)}%`} 
  description="Average idea confidence" 
  icon="chart"
  variant="primary"
  trend={{
    value: 5.2,
    label: "vs last month",
    direction: "up",
    isGood: true
  }}
/>
```

### Analytics Migration

The analytics pages have also been updated to use the new component:

```tsx
// app/analytics/page.tsx
import { StatCard } from "@/components/common/cards/StatCard";

// ...

<StatCard 
  title="Total Visits" 
  value={totalVisits} 
  description="Visits this month" 
  icon="users"
  variant="primary"
/>

<StatCard 
  title="Conversion Rate" 
  value={`${conversionRate.toFixed(1)}%`} 
  description="Current conversion rate" 
  icon="trending"
  variant="success"
  trend={{
    value: 2.3,
    label: "vs last month",
    direction: "up",
    isGood: true
  }}
/>
```

## Key Improvements

1. **Consistent Styling**: All StatCard instances now use the same styling system with variants
2. **Enhanced Features**: Added support for trend indicators, loading states, and interactive behavior
3. **Better Component Structure**: Organized in a more maintainable directory structure
4. **Improved Props Interface**: More comprehensive and type-safe props interface
5. **Accessibility**: Proper ARIA attributes and keyboard navigation
6. **Performance Optimizations**: Efficient rendering and animations
7. **Comprehensive Testing**: Unit tests for all features and edge cases
8. **Complete Documentation**: JSDoc comments, Storybook stories, and usage examples

## Conclusion

The StatCard component migration has been successfully completed. The new unified component provides a more consistent, feature-rich, accessible way to display statistics throughout the application. All instances of the old component have been updated to use the new implementation, and the old component files have been removed.

The migration has improved the codebase by:
- Reducing duplication
- Standardizing the interface
- Enhancing the feature set
- Improving accessibility
- Optimizing performance
- Providing comprehensive documentation
- Ensuring consistent styling

This migration serves as a model for future component standardization efforts.