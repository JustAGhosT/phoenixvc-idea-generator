# BarChart Component Migration

## Current Implementations

Currently, there are multiple implementations of the BarChart component:

1. **Dashboard BarChart** (`components/dashboard/BarChart.tsx`)
   - Used in the dashboard page
   - Takes `ideas` and `toNumber` props
   - Displays confidence and rating metrics
   - Simple implementation with fixed styling
   - No support for horizontal orientation

2. **UI Chart BarChart** (`components/ui/chart.tsx`)
   - Generic implementation
   - Takes `data` and `options` props
   - Uses Chart.js under the hood
   - More configurable but less consistent with design system

## Migration Plan

### Target Location
- New unified component: `components/charts/bar/BarChart.tsx`
- Core types: `components/charts/core/types.ts`
- LESS module: `components/charts/bar/BarChart.less`

### Directory Structure

```
components/
└── charts/
    ├── core/
    │   └── types.ts
    └── bar/
        ├── index.ts
        ├── BarChart.tsx
        ├── BarChart.less
        └── BarChart.test.tsx
```

### Standardized Interface

The new component will use a standardized interface that supports both simple and complex use cases:

```typescript
// Core interfaces (simplified)
export interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: any; // Additional metadata
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface BaseChartProps {
  height?: number | string;
  width?: number | string;
  title?: string;
  description?: string;
  series: ChartSeries[];
  colors?: string[];
  formatter?: (value: number) => string;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

// BarChart specific props
export interface BarChartProps extends BaseChartProps {
  horizontal?: boolean;
  stacked?: boolean;
  maxItems?: number;
  barRadius?: number;
  barGap?: number;
  emptyStateMessage?: string;
  onBarClick?: (item: ChartDataPoint) => void;
}
```

### LESS Module Design

The LESS module will include styles for:
- Container layout with flexbox
- Bar styling with customizable colors and radius
- Horizontal and vertical orientations
- Empty state presentation
- Responsive behavior for different screen sizes
- Proper spacing and typography aligned with design system

### Implementation Strategy

1. Create the core types file with shared interfaces
2. Create the LESS module with styling for the component
3. Implement the new BarChart component with all features
4. Add adapter functions to convert from existing data formats
5. Create unit tests and Storybook stories
6. Update imports in dashboard and other pages
7. Test thoroughly in all contexts
8. Remove old implementations once migration is complete

### Usage Examples

#### Current vs New Usage

**Current Dashboard Usage:**
```tsx
<BarChart 
  ideas={ideas} 
  toNumber={toNumber}
/>
```

**New Dashboard Usage:**
```tsx
<BarChart 
  title="Idea Confidence"
  description="Confidence scores for top ideas"
  series={[{
    name: "Confidence",
    data: ideas
      .filter(idea => idea.title && idea.confidence)
      .map(idea => ({
        label: idea.title,
        value: toNumber(idea.confidence),
        id: idea.id // Pass through additional data
      }))
  }]}
  formatter={(value) => `${value.toFixed(1)}%`}
  onBarClick={(item) => router.push(`/ideas/${item.id}`)}
/>
```

#### Variant Examples

- **Horizontal Bar Chart**: Set `horizontal={true}` for horizontal orientation
- **Stacked Bar Chart**: Set `stacked={true}` and provide multiple series
- **Custom Styling**: Use `colors`, `barRadius`, and `className` props
- **Responsive**: Component adapts to container size with configurable dimensions

## Accessibility Considerations

- Use proper ARIA attributes for interactive elements
- Ensure keyboard navigation works for clickable bars
- Provide descriptive labels for screen readers
- Ensure sufficient color contrast for bar colors
- Support high contrast mode
- Add proper focus states for interactive elements

## Performance Considerations

- Use `useMemo` for expensive calculations
- Limit the number of items displayed by default
- Implement virtualization for large datasets
- Optimize animations for smooth performance
- Minimize re-renders with proper React patterns

## Unit Testing Strategy

Tests will cover:
- Rendering with different data configurations
- Empty state handling
- Click interactions
- Value formatting
- Accessibility requirements
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
  - [ ] Create the core types file
  - [ ] Create the LESS module
  - [ ] Create the unified component
  - [ ] Implement all necessary functionality
  - [ ] Add proper TypeScript typing
  - [ ] Ensure responsive behavior
  - [ ] Add accessibility features
  - [ ] Write unit tests
  - [ ] Create Storybook stories

- [ ] **Migration Phase**
  - [ ] Update imports in dashboard page
  - [ ] Update imports in compare page
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

- Need to support both simple bar charts and more complex configurations
- Consider adding animation capabilities for data changes
- May need to support responsive behavior differently on mobile devices
- Should handle empty data states gracefully with customizable messages
- Consider adding export functionality (PNG, CSV)
- Add support for tooltips on hover/focus
- Consider adding zoom capabilities for large datasets
- Ensure RTL language support
- Add support for theming and dark mode
- Consider adding a loading state for asynchronous data

## Timeline and Resources

**Estimated Timeline:**
- Core types and initial component structure: 1 day
- LESS module implementation: 1 day
- Component implementation: 2-3 days
- Testing and refinement: 1-2 days
- Migration of existing usages: 1-2 days
- Documentation and cleanup: 1 day

**Required Resources:**
- 1 Frontend developer (primary)
- 1 Designer (consultation for styling review)
- QA support for testing in different contexts

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing functionality | High | Create adapter components or HOCs for backward compatibility |
| Performance regression | Medium | Benchmark before and after, optimize rendering |
| Inconsistent styling | Medium | Review with design team, create visual regression tests |
| Incomplete migration | Low | Track all usages in a spreadsheet, verify each instance |

## Success Criteria

The migration will be considered successful when:
1. All existing BarChart usages are migrated to the new component
2. No visual regressions are present in any context
3. Performance is equal to or better than the original implementations
4. The component is fully documented with examples
5. All tests pass, including accessibility tests
6. The old implementations are safely removed