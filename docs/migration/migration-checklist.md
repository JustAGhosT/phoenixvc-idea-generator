# Component Migration Checklist

Use this checklist for each component that needs to be migrated to ensure a systematic and thorough process.

## Component Name: ________________

### 1. Identification Phase
- [ ] Identify all instances of the component in the codebase
  - [ ] Search for import statements
  - [ ] Search for component usage in JSX/TSX
  - [ ] Check for references in documentation or comments
- [ ] List all files where the component is used
- [ ] Document the current props interface and behavior
- [ ] Identify any variations or inconsistencies in usage
- [ ] Analyze current styling approach and dependencies

### 2. Design Phase
- [ ] Design a standardized interface
  - [ ] Define required and optional props
  - [ ] Set appropriate default values
  - [ ] Create TypeScript interfaces
  - [ ] Document prop types and descriptions
- [ ] Identify the appropriate directory for the component
- [ ] Create LESS module structure
- [ ] Plan any necessary refactoring for better composition
- [ ] Consider accessibility requirements
- [ ] Define responsive behavior requirements

### 3. Implementation Phase
- [ ] Create the LESS module with component-specific styles
- [ ] Create the unified component with standardized interface
- [ ] Implement all necessary functionality
- [ ] Add proper TypeScript typing
- [ ] Ensure responsive behavior
- [ ] Add accessibility features (aria attributes, keyboard navigation)
- [ ] Optimize for performance if needed
- [ ] Write unit tests
- [ ] Create Storybook stories

### 4. Migration Phase
- [ ] Move the component to its appropriate directory
- [ ] Update imports in all files that use the component
- [ ] Adjust component usage to match the new interface
- [ ] Test the component in all contexts where it's used
- [ ] Fix any issues that arise during testing
- [ ] Address any design inconsistencies

### 5. Documentation Phase
- [ ] Add JSDoc comments to the component
- [ ] Create usage examples
- [ ] Document any props that require special attention
- [ ] Document accessibility considerations
- [ ] Document performance considerations
- [ ] Update any existing documentation that references the component

### 6. Cleanup Phase
- [ ] Verify all uses of the component are working correctly
- [ ] Remove the old component
- [ ] Remove any unused imports or dependencies
- [ ] Clean up any temporary files or code
- [ ] Remove feature flags if used during migration

### 7. Review Phase
- [ ] Conduct a code review
- [ ] Check for any performance issues
- [ ] Verify accessibility compliance
- [ ] Ensure documentation is complete and accurate
- [ ] Conduct final testing in all contexts
- [ ] Get sign-off from design team if applicable

## Example: Migrating the BarChart Component

### Component Name: BarChart

#### 1. Identification Phase
- [x] Identify all instances of the component in the codebase
  - [x] Found in `components/dashboard/BarChart.tsx`
  - [x] Found in `components/ui/chart.tsx`
  - [x] Used in `app/dashboard/page.tsx`
  - [x] Used in `app/ideas/compare/page.tsx`
- [x] List all files where the component is used
  - `app/dashboard/page.tsx`
  - `app/ideas/compare/page.tsx`
  - `app/projects/[id]/page.tsx`
- [x] Document the current props interface and behavior
  ```typescript
  // In components/dashboard/BarChart.tsx
  interface BarChartProps {
    ideas: Idea[];
    toNumber: (value: string | number) => number;
  }
  
  // In components/ui/chart.tsx
  interface BarChartProps {
    data: any;
    options: any;
  }
  ```
- [x] Identify any variations or inconsistencies in usage
  - Dashboard page passes `ideas` and `toNumber` props
  - Compare page passes `data` and `options` props
- [x] Analyze current styling approach
  - Dashboard version uses inline styles
  - UI Chart version uses Chart.js defaults

#### 2. Design Phase
- [x] Design a standardized interface
  ```typescript
  export interface ChartDataPoint {
    label: string;
    value: number;
    [key: string]: any;
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
    onBarClick?: (item: ChartDataPoint) => void;
  }
  ```
- [x] Identify the appropriate directory for the component
  - `components/charts/bar/BarChart.tsx`
- [x] Create LESS module structure
  - `components/charts/bar/BarChart.less`
- [x] Plan necessary refactoring
  - Convert from using direct `ideas` to using standardized `series` format
  - Support both simple and complex chart configurations
  - Add support for horizontal orientation

#### 3. Implementation Phase
- [ ] Create the LESS module with component-specific styles
- [ ] Create the unified component with standardized interface
- [ ] Implement all necessary functionality
- [ ] Add proper TypeScript typing
- [ ] Ensure responsive behavior
- [ ] Add accessibility features
- [ ] Optimize for performance if needed
- [ ] Write unit tests
- [ ] Create Storybook stories

#### 4-7. Remaining Phases
- [ ] Complete migration, documentation, cleanup, and review phases