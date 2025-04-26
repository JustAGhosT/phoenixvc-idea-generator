# BarChart Component Migration - Phase A

This checklist covers the identification and design phases for migrating the BarChart component.

## Component Name: BarChart

### 1. Identification Phase

- [x] Identify all instances of the component in the codebase
  - Found in `components/dashboard/BarChart.tsx` - Dashboard-specific implementation
  - Found in `components/charts/bar/BarChart.tsx` - More generalized implementation
- [x] Current props interfaces
  ```typescript
  // In components/dashboard/BarChart.tsx
  export interface BarChartProps {
    ideas: Idea[];
    toNumber: (value: string | number) => number;
  }
  
  // In components/charts/bar/BarChart.tsx
  export interface BarChartProps extends BaseChartProps {
    horizontal?: boolean;
    stacked?: boolean;
    maxItems?: number;
  }
  
  // BaseChartProps interface
  export interface BaseChartProps {
    height?: string | number;
    width?: string | number;
    title?: string;
    description?: string;
    series: { name: string, data: { label: string, value: number, max?: number }[] }[];
    colors?: string[];
    formatter?: (value: number) => string;
    showLegend?: boolean;
    className?: string;
  }
  ```
- [x] Variations in usage
  - Dashboard version: Uses ideas data directly, shows confidence and rating metrics
  - Charts version: Uses standardized series data format, more configurable
  - Both use Progress component for rendering bars (not SVG)
- [x] Current styling approach
  - Both implementations use Tailwind CSS classes
  - Charts version uses shadcn/ui Card components for container
- [x] Current state management
  - Simple data transformation, no complex state management

### 2. Design Phase

- [ ] Component classification: Chart Component (Molecule)
- [ ] Standardized interface
  ```typescript
  // Proposed unified interface
  export interface ChartDataPoint {
    label: string;
    value: number;
    max?: number;
    [key: string]: any;  // Additional data
  }

  export interface ChartSeries {
    name: string;
    data: ChartDataPoint[];
    color?: string;
  }

  export interface BarChartProps {
    series: ChartSeries[];
    height?: string | number;
    width?: string | number;
    formatter?: (value: number) => string;
    colors?: string[];
    title?: string;
    description?: string;
    className?: string;
    horizontal?: boolean;
    stacked?: boolean;
    maxItems?: number;
    onBarClick?: (item: ChartDataPoint) => void;
  }
  ```
- [ ] Directory: `components/charts/bar/`
- [ ] Design pattern: Composition pattern with adapters
- [ ] LESS module structure
  ```less
  // Proposed LESS structure
  .bar-chart {
    &__container {}
    &__bar {
      &--blue {}
      &--green {}
      &--purple {}
      &--orange {}
      &--red {}
    }
    &__label {}
    &__value {}
    
    // Variants
    &--horizontal {}
    &--stacked {}
  }
  ```
- [ ] Accessibility requirements
  - Proper ARIA attributes for Progress components
  - Color contrast for all color variants
  - Keyboard navigation for interactive elements
- [ ] Responsive behavior
  - Maintain current responsive design
  - Optimize for mobile viewports

### 3. Migration Strategy

- [ ] Migration approach: Incremental with adapters
- [ ] Breaking changes: Consolidating two different interfaces
- [ ] Backward compatibility: Create adapters for both existing implementations
- [ ] Estimated effort: 3 days total

## Notes and Observations

The current BarChart component exists in two different implementations with different interfaces. The migration will focus on unifying these approaches while maintaining the current visual design using the Progress component. The generalized implementation in `components/charts/bar/BarChart.tsx` is already closer to the desired final structure and can serve as the foundation for the unified component.

## Phase A Approval

- [ ] Design approved by: _______________ (Date: ____________)
- [ ] Technical approach approved by: _______________ (Date: ____________)
- [ ] Ready to proceed to Phase B