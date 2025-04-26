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
  - [ ] `components/common/cards/stat-card/`
- [ ] Plan CSS Module structure with Tailwind
  ```css
  /* Proposed CSS Module structure */
  .statCard {
    @apply rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm transition-all;
  }
  
  .statCardInteractive {
    @apply cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
  
  /* Variants */
  .default {
    @apply border-l-4 border-gray-300 dark:border-gray-600;
  }
  
  .primary {
    @apply border-l-4 border-primary-500;
  }
  
  .success {
    @apply border-l-4 border-green-500;
  }
  
  .warning {
    @apply border-l-4 border-yellow-500;
  }
  
  .danger {
    @apply border-l-4 border-red-500;
  }
  
  .info {
    @apply border-l-4 border-blue-500;
  }
  
  /* Elements */
  .title {
    @apply text-sm font-medium text-gray-500 dark:text-gray-400;
  }
  
  .value {
    @apply text-2xl font-bold mt-1;
  }
  
  .description {
    @apply text-xs text-gray-500 dark:text-gray-400 mt-1;
  }
  
  .iconContainer {
    @apply flex items-center justify-center h-8 w-8 rounded-full;
  }
  
  /* Trend */
  .trend {
    @apply flex items-center mt-2 text-xs;
  }
  
  .trendUp {
    @apply text-green-500;
  }
  
  .trendDown {
    @apply text-red-500;
  }
  
  .trendNeutral {
    @apply text-gray-500;
  }
  
  /* States */
  .loading .value, .loading .description {
    @apply animate-pulse bg-gray-200 dark:bg-gray-700 rounded;
  }
  
  .loading .value {
    @apply h-7 w-24;
  }
  
  .loading .description {
    @apply h-4 w-32 mt-2;
  }
  
  /* Compact variant */
  .compact {
    @apply p-3;
  }
  
  .compact .value {
    @apply text-xl;
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
  - Leverage Tailwind's responsive utilities

### 3. Migration Strategy

- [ ] Determine migration approach
  - Incremental migration with feature flags
  - Create adapter for backward compatibility
- [ ] Identify potential breaking changes
  - Directory structure change
  - Styling approach change (from CSS classes to CSS Modules with Tailwind)
- [ ] Plan backward compatibility
  - Create adapter component that maps old props to new props
  - Maintain current behavior during transition
- [ ] Estimate migration effort
  - Development: 3 days
  - Testing: 1 day
  - Documentation: 1 day

## Notes and Observations

The current StatCard component is already well-designed with good accessibility features and a comprehensive API. The migration will focus on standardizing the styling approach with CSS Modules and Tailwind utilities, ensuring consistency with other components in the new system. The use of Tailwind will help maintain a consistent design language while CSS Modules will provide scoped styling to prevent conflicts.

## Phase A Approval

- [ ] Design approved by: _______________ (Date: ____________)
- [ ] Technical approach approved by: _______________ (Date: ____________)
- [ ] Ready to proceed to Phase B