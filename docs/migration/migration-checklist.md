# Component Migration Checklist

Use this checklist for each component that needs to be migrated to ensure a systematic and thorough process that follows our component architecture principles and design patterns.

## Component Name: ________________

### 1. Identification Phase
- [ ] Identify all instances of the component in the codebase
  - [ ] Search for import statements
  - [ ] Search for component usage in JSX/TSX
  - [ ] Search for references in documentation or comments
- [ ] List all files where the component is used
- [ ] Document the current props interface and behavior
- [ ] Identify any variations or inconsistencies in usage
- [ ] Analyze current styling approach and dependencies
- [ ] Identify current state management approach
- [ ] Document any performance or accessibility issues

### 2. Design Phase
- [ ] Determine component classification
  - [ ] Core Component (Atom)
  - [ ] Composite Component (Molecule)
  - [ ] Feature Component (Organism)
  - [ ] Layout Component
  - [ ] Page Component
- [ ] Design a standardized interface
  - [ ] Define required and optional props
  - [ ] Set appropriate default values
  - [ ] Create TypeScript interfaces
  - [ ] Document prop types and descriptions
- [ ] Identify the appropriate directory for the component
- [ ] Determine if component should use a design pattern:
  - [ ] Compound Component pattern
  - [ ] Render Props pattern
  - [ ] Custom Hook pattern
  - [ ] Composition pattern
- [ ] Create LESS module structure
- [ ] Plan any necessary refactoring for better composition
- [ ] Consider accessibility requirements
- [ ] Define responsive behavior requirements
- [ ] Plan state management approach
  - [ ] Local state
  - [ ] Context API
  - [ ] Custom hooks

### 3. Implementation Phase
- [ ] Create the LESS module with component-specific styles
- [ ] Create the unified component with standardized interface
- [ ] Implement component using appropriate design pattern:
  ```tsx
  // Example of compound component pattern
  export function Tabs({ children, defaultValue, ...props }) {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div className="tabs-container" {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
  
  Tabs.List = function TabsList({ children }) {
    return <div className="tabs-list">{children}</div>;
  };
  
  Tabs.Tab = function Tab({ value, children }) {
    const { activeTab, setActiveTab } = useTabsContext();
    return (
      <button
        className={`tab ${activeTab === value ? 'active' : ''}`}
        onClick={() => setActiveTab(value)}
      >
        {children}
      </button>
    );
  };
  
  Tabs.Content = function TabContent({ value, children }) {
    const { activeTab } = useTabsContext();
    if (activeTab !== value) return null;
    return <div className="tab-content">{children}</div>;
  };
  ```
- [ ] Extract complex logic into custom hooks:
  ```tsx
  // Example of custom hook extraction
  function useFormField(initialValue = '') {
    const [value, setValue] = useState(initialValue);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');
    
    const handleChange = useCallback((e) => {
      setValue(e.target.value);
    }, []);
    
    const handleBlur = useCallback(() => {
      setTouched(true);
    }, []);
    
    const validate = useCallback((validationFn) => {
      const error = validationFn(value);
      setError(error);
      return !error;
    }, [value]);
    
    return {
      value,
      setValue,
      touched,
      error,
      handleChange,
      handleBlur,
      validate,
      inputProps: {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
      },
    };
  }
  ```
- [ ] Implement all necessary functionality
- [ ] Add proper TypeScript typing
- [ ] Ensure responsive behavior
- [ ] Add accessibility features (aria attributes, keyboard navigation)
- [ ] Optimize for performance:
  - [ ] Memoize pure components with React.memo
  - [ ] Use useMemo for expensive calculations
  - [ ] Use useCallback for event handlers
  - [ ] Implement virtualization for long lists
- [ ] Write unit tests
- [ ] Create Storybook stories
- [ ] Implement error boundaries if needed

### 4. Migration Phase
- [ ] Move the component to its appropriate directory
- [ ] Update imports in all files that use the component
- [ ] Adjust component usage to match the new interface
- [ ] Test the component in all contexts where it's used
- [ ] Fix any issues that arise during testing
- [ ] Address any design inconsistencies
- [ ] Implement feature flags for breaking changes if needed

### 5. Documentation Phase
- [ ] Add JSDoc comments to the component
  ```tsx
  /**
   * Button component with multiple variants and sizes.
   * 
   * @example
   * ```tsx
   * <Button variant="primary" size="md" onClick={handleClick}>
   *   Click me
   * </Button>
   * ```
   * 
   * @param props - Button props
   * @returns A button element
   */
  export function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
    // Implementation
  }
  ```
- [ ] Create usage examples
- [ ] Document any props that require special attention
- [ ] Document accessibility considerations
- [ ] Document performance considerations
- [ ] Update any existing documentation that references the component
- [ ] Add component to the component library documentation

### 6. Cleanup Phase
- [ ] Verify all uses of the component are working correctly
- [ ] Remove the old component
- [ ] Remove any unused imports or dependencies
- [ ] Clean up any temporary files or code
- [ ] Remove feature flags if used during migration
- [ ] Run linting and formatting on all modified files

### 7. Review Phase
- [ ] Conduct a code review
- [ ] Check for any performance issues
- [ ] Verify accessibility compliance
- [ ] Ensure documentation is complete and accurate
- [ ] Conduct final testing in all contexts
- [ ] Get sign-off from design team if applicable
- [ ] Update component status in migration tracking

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
- [x] Identify current state management approach
  - Dashboard version manages state internally
  - UI Chart version relies on Chart.js state management

#### 2. Design Phase
- [x] Determine component classification
  - [x] Composite Component (Molecule)
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
- [x] Determine if component should use a design pattern:
  - [x] Composition pattern for different chart configurations
- [x] Create LESS module structure
  - `components/charts/bar/BarChart.less`
- [x] Plan necessary refactoring
  - Convert from using direct `ideas` to using standardized `series` format
  - Support both simple and complex chart configurations
  - Add support for horizontal orientation
- [x] Plan state management approach
  - [x] Extract chart rendering logic to custom hook `useBarChart`

#### 3. Implementation Phase
- [x] Create the LESS module with component-specific styles
  ```less
  .bar-chart {
    &__container {
      position: relative;
      width: 100%;
    }
    
    &__title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    &__description {
      color: @text-secondary;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    
    &__bar {
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        opacity: 0.8;
      }
    }
    
    &__label {
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &__value {
      font-weight: bold;
      font-size: 0.875rem;
    }
  }
  ```
- [x] Create custom hook for chart logic
  ```typescript
  function useBarChart(props: BarChartProps) {
    const { series, horizontal, stacked, formatter } = props;
    
    // Calculate scales, dimensions, etc.
    const dimensions = useMemo(() => calculateDimensions(series, horizontal), [series, horizontal]);
    
    // Format values
    const formatValue = useCallback((value: number) => {
      if (formatter) return formatter(value);
      return value.toString();
    }, [formatter]);
    
    // Handle bar click
    const handleBarClick = useCallback((item: ChartDataPoint) => {
      if (props.onBarClick) {
        props.onBarClick(item);
      }
    }, [props.onBarClick]);
    
    return {
      dimensions,
      formatValue,
      handleBarClick,
    };
  }
  ```
- [x] Create the unified component with standardized interface
  ```typescript
  export function BarChart(props: BarChartProps) {
    const {
      series,
      height = 300,
      width = '100%',
      colors = defaultColors,
      title,
      description,
      className,
      horizontal = false,
      stacked = false,
    } = props;
    
    const { dimensions, formatValue, handleBarClick } = useBarChart(props);
    
    return (
      <div 
        className={cn('bar-chart__container', className)}
        style={{ height, width }}
      >
        {title && <h3 className="bar-chart__title">{title}</h3>}
        {description && <p className="bar-chart__description">{description}</p>}
        
        <svg width="100%" height="100%">
          {/* Chart implementation */}
          {series.map((s, seriesIndex) => (
            <g key={s.name}>
              {s.data.map((d, i) => (
                <rect
                  key={`${s.name}-${d.label}`}
                  className="bar-chart__bar"
                  x={horizontal ? 0 : dimensions.getX(i, seriesIndex)}
                  y={horizontal ? dimensions.getY(i, seriesIndex) : dimensions.getBarY(d.value)}
                  width={horizontal ? dimensions.getBarWidth(d.value) : dimensions.barWidth}
                  height={horizontal ? dimensions.barHeight : dimensions.getBarHeight(d.value)}
                  fill={s.color || colors[seriesIndex % colors.length]}
                  onClick={() => handleBarClick(d)}
                  role="graphics-symbol"
                  aria-label={`${d.label}: ${d.value}`}
                />
              ))}
            </g>
          ))}
          {/* Axes, labels, etc. */}
        </svg>
      </div>
    );
  }
  ```
- [x] Add proper TypeScript typing
- [x] Ensure responsive behavior
- [x] Add accessibility features
- [x] Optimize for performance
- [x] Write unit tests
- [x] Create Storybook stories

#### 4-7. Remaining Phases
- [ ] Complete migration, documentation, cleanup, and review phases