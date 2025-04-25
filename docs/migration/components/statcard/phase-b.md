# StatCard Component Migration - Phase B

This checklist covers the implementation, migration, documentation, cleanup, and review phases for the StatCard component.

## Component Name: StatCard

### 1. Implementation Phase

- [x] Create the LESS module with component-specific styles
  ```less
  .stat-card {
    padding: 1rem;
    border-radius: 0.5rem;
    
    &--outline { border: 1px solid @border-color; }
    &--filled { background-color: @background-secondary; }
    
    &__title { font-size: 0.875rem; color: @text-secondary; }
    &__value { font-size: 1.5rem; font-weight: bold; margin: 0.5rem 0; }
    
    &__trend {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      
      &--up { color: @success-color; }
      &--down { color: @error-color; }
      &--neutral { color: @text-secondary; }
    }
    
    // Size variants
    &--sm { padding: 0.75rem; .stat-card__value { font-size: 1.25rem; } }
    &--lg { padding: 1.5rem; .stat-card__value { font-size: 2rem; } }
  }
  ```

- [x] Create the unified component
  ```tsx
  export function StatCard({
    title,
    value,
    icon,
    trend,
    formatter = (val) => String(val),
    className,
    size = 'md',
    variant = 'default',
  }: StatCardProps) {
    const formattedValue = typeof value === 'number' ? formatter(value) : value;
    
    return (
      <div 
        className={cn('stat-card', `stat-card--${size}`, `stat-card--${variant}`, className)}
        aria-labelledby={`stat-title-${title.replace(/\s+/g, '-')}`}
      >
        <h3 
          id={`stat-title-${title.replace(/\s+/g, '-')}`}
          className="stat-card__title"
        >
          {title}
        </h3>
        
        <div className="stat-card__value">
          {icon && <span className="stat-card__icon">{icon}</span>}
          {formattedValue}
        </div>
        
        {trend && (
          <div className={`stat-card__trend stat-card__trend--${trend.direction || 'neutral'}`}>
            {trend.direction === 'up' && <ArrowUpIcon />}
            {trend.direction === 'down' && <ArrowDownIcon />}
            <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
            {trend.label && <span className="stat-card__trend-label">{trend.label}</span>}
          </div>
        )}
      </div>
    );
  }
  ```

- [x] Create adapter functions
  ```tsx
  // Convert old StatDisplay props to new StatCard props
  export function adaptStatDisplayProps(props: StatDisplayProps): StatCardProps {
    return {
      title: props.label,
      value: props.stat,
      formatter: props.format ? (val) => format(val, props.format) : undefined,
      trend: props.comparison ? {
        value: calculatePercentage(props.stat, props.comparison.value),
        direction: getDirection(props.stat, props.comparison.value),
        label: props.comparison.label
      } : undefined
    };
  }
  ```

- [x] Write unit tests
  ```tsx
  describe('StatCard', () => {
    it('renders correctly with basic props', () => {
      render(<StatCard title="Revenue" value={1500} />);
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('1500')).toBeInTheDocument();
    });
    
    it('formats numbers correctly', () => {
      const formatter = (val: number) => `$${val.toLocaleString()}`;
      render(<StatCard title="Revenue" value={1500} formatter={formatter} />);
      expect(screen.getByText('$1,500')).toBeInTheDocument();
    });
    
    it('displays trend correctly', () => {
      render(
        <StatCard 
          title="Growth" 
          value={15} 
          trend={{ value: 5.2, direction: 'up' }} 
        />
      );
      expect(screen.getByText('+5.2%')).toBeInTheDocument();
    });
  });
  ```

- [x] Create Storybook stories
  ```tsx
  export default {
    title: 'Data Display/StatCard',
    component: StatCard,
  };
  
  export const Default = () => (
    <StatCard title="Total Users" value={2543} />
  );
  
  export const WithTrend = () => (
    <StatCard 
      title="Revenue" 
      value="$15,234" 
      trend={{ value: 12.5, direction: 'up', label: 'vs last month' }} 
    />
  );
  
  export const Variants = () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <StatCard title="Default" value={100} variant="default" />
      <StatCard title="Outline" value={100} variant="outline" />
      <StatCard title="Filled" value={100} variant="filled" />
    </div>
  );
  ```

### 2. Migration Phase

- [x] Move component to appropriate directory
- [x] Update imports in all files
- [x] Test component in all contexts
- [x] Fix any issues during testing

### 3. Documentation Phase

- [x] Add JSDoc comments
  ```tsx
  /**
   * StatCard displays a key metric with optional trend indicator.
   * 
   * @example
   * <StatCard 
   *   title="Total Revenue" 
   *   value={1500} 
   *   formatter={(val) => `$${val}`}
   *   trend={{ value: 12, direction: 'up', label: 'vs last month' }}
   * />
   */
  ```

- [x] Document accessibility considerations
  ```markdown
  ## Accessibility
  - Uses semantic heading for title
  - Trend direction is conveyed by both color and icon
  - ARIA attributes for screen readers
  ```

### 4. Cleanup Phase

- [x] Verify all uses working correctly
- [x] Remove unused imports
- [x] Run linting and formatting

### 5. Review Phase

- [x] Conduct code review
- [x] Verify accessibility compliance
- [x] Ensure documentation is complete
- [x] Update component status in tracking

## Migration Completion

- [x] Implementation completed by: Alex Johnson (Date: 2025-04-24)
- [x] Code review completed by: Maria Garcia (Date: 2025-04-25)
- [x] Migration approved by: Miguel Rodriguez (Date: 2025-04-25)

## Post-Migration Notes

The StatCard migration was straightforward with the main challenge being the unification of two similar but differently named interfaces. The adapter pattern worked well for maintaining backward compatibility.