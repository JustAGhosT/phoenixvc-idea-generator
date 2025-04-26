# StatCard Component Migration - Phase A

This checklist covers the identification and design phases for migrating the StatCard component.

## Component Name: StatCard

### 1. Identification Phase

- [x] Identify all instances of the component in the codebase
  - Found in `components/common/cards/StatCard.tsx`
- [x] Current props interface
  ```typescript
  // Current interface (based on actual implementation)
  export interface StatCardProps {
    /** Title displayed at the top of the card */
    title: string;
    /** Main value to display (can be a string or number) */
    value: string | number;
    /** Optional description text displayed below the value */
    description?: string;
    /** Icon to display (can be a string identifier or a React node) */
    icon?: string | React.ReactNode;
    /** Optional trend information to display */
    trend?: StatCardTrend;
    /** Color variant for the card */
    variant?: StatCardVariant;
    /** Whether the card is in a loading state */
    loading?: boolean;
    /** Additional CSS class names */
    className?: string;
    /** Prefix to display before the value (e.g., "$") */
    valuePrefix?: string;
    /** Suffix to display after the value (e.g., "%") */
    valueSuffix?: string;
    /** Optional click handler for interactive cards */
    onClick?: () => void;
    /** Whether to use the compact layout */
    compact?: boolean;
    /** Optional tooltip content */
    tooltipContent?: React.ReactNode;
    /** Accessible label for screen readers (defaults to title) */
    ariaLabel?: string;
  }

  export interface StatCardTrend {
    /** The numeric value of the trend (e.g., 5.2 for 5.2% increase) */
    value: number;
    /** Label explaining the trend context (e.g., "vs last month") */
    label: string;
    /** Direction of the trend */
    direction: "up" | "down" | "neutral";
    /** Whether this trend is positive (up can be bad for some metrics) */
    isGood?: boolean;
  }
  ```
- [x] Variations in usage
  - Used with different icons (string identifiers or React nodes)
  - Used with various trend indicators
  - Different variants (default, primary, success, warning, danger, info)
  - Interactive (with onClick) and non-interactive versions
  - With and without tooltips
- [x] Current styling approach
  - Uses shadcn/ui Card components
  - CSS classes for styling variants and states
- [x] Current state management
  - Uses React hooks (useId) for accessibility
  - No complex state management

### 2. Design Phase

- [ ] Determine component classification
  - [ ] Core Component (Atom)
- [ ] Design standardized interface
  ```typescript
  // Proposed interface for migration (preserving current functionality)
  export interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: string | React.ReactNode;
    trend?: {
      value: number;
      label: string;
      direction: "up" | "down" | "neutral";
      isGood?: boolean;
    };
    variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
    loading?: boolean;
    className?: string;
    valuePrefix?: string;
    valueSuffix?: string;
    onClick?: () => void;
    compact?: boolean;
    tooltipContent?: React.ReactNode;
    ariaLabel?: string;
    formatter?: (value: number | string) => string;
  }
  ```
- [ ] Identify appropriate directory
  - [ ] `components/data-display/stat-card/`
- [ ] Plan LESS module structure
  ```less
  // Proposed LESS structure
  .stat-card {
    // Base styles
    
    // Variants
    &--default { }
    &--primary { }
    &--success { }
    &--warning { }
    &--danger { }
    &--info { }
    
    // States
    &--loading { }
    &--compact { }
    &--interactive { }
    
    // Elements
    &__header { }
    &__title { }
    &__icon { }
    &__content { }
    &__value { }
    &__description { }
    &__trend {
      &--up { }
      &--down { }
      &--neutral { }
      &--good { }
      &--bad { }
    }
  }
  ```
- [ ] Consider accessibility requirements
  - Preserve current accessibility features:
    - Unique IDs for title and description
    - Appropriate ARIA attributes
    - Keyboard navigation for interactive cards
  - Add improvements:
    - Better screen reader announcements for trends
    - Enhanced color contrast for all variants
- [ ] Define responsive behavior
  - Maintain current responsive design
  - Add specific breakpoints for compact view

### 3. Migration Strategy

- [ ] Determine migration approach
  - Incremental migration with feature flags
  - Create adapter for backward compatibility
- [ ] Identify potential breaking changes
  - Directory structure change
  - Styling approach change (from CSS classes to LESS modules)
- [ ] Plan backward compatibility
  - Create adapter component that maps old props to new props
  - Maintain current behavior during transition
- [ ] Estimate migration effort
  - Development: 3 days
  - Testing: 1 day
  - Documentation: 1 day

## Notes and Observations

The current StatCard component is already well-designed with good accessibility features and a comprehensive API. The migration will focus on standardizing the styling approach with LESS modules and ensuring consistency with other components in the new system.

## Phase A Approval

- [ ] Design approved by: _______________ (Date: ____________)
- [ ] Technical approach approved by: _______________ (Date: ____________)
- [ ] Ready to proceed to Phase B