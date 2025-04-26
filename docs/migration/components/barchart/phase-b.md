# BarChart Component Migration - Phase B

This checklist will cover the implementation, migration, documentation, cleanup, and review phases for the BarChart component.

## Component Name: BarChart

### 1. Implementation Phase (Planned)

- [ ] Create LESS module
  ```less
  // Planned structure for BarChart.less
  .bar-chart {
    &__container {
      width: 100%;
    }
    
    &__title {
      font-weight: 600;
      font-size: @font-size-base;
    }
    
    &__description {
      color: @text-secondary;
      font-size: @font-size-sm;
    }
    
    &__item {
      margin-bottom: @spacing-md;
    }
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: @spacing-xs;
    }
    
    &__label {
      font-size: @font-size-sm;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 180px;
    }
    
    &__value {
      font-size: @font-size-sm;
      font-weight: 500;
    }
    
    &__progress {
      &--blue {
        background-color: @blue-100;
        .progress-indicator {
          background-color: @blue-600;
        }
      }
      
      &--green {
        background-color: @green-100;
        .progress-indicator {
          background-color: @green-600;
        }
      }
      
      &--purple {
        background-color: @purple-100;
        .progress-indicator {
          background-color: @purple-600;
        }
      }
      
      &--orange {
        background-color: @orange-100;
        .progress-indicator {
          background-color: @orange-600;
        }
      }
      
      &--red {
        background-color: @red-100;
        .progress-indicator {
          background-color: @red-600;
        }
      }
    }
    
    &__divider {
      margin: @spacing-sm 0;
      border-bottom: 1px solid @border-color;
    }
    
    &__empty {
      text-align: center;
      padding: @spacing-lg;
      color: @text-secondary;
    }
  }
  ```

- [ ] Implement unified component with LESS module
  ```tsx
  // Planned implementation - not yet implemented
  import React from 'react';
  import { Progress } from "@/components/ui/progress";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import './BarChart.less';
  
  export interface ChartDataPoint {
    label: string;
    value: number;
    max?: number;
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
    maxItems?: number;
    onBarClick?: (item: ChartDataPoint) => void;
  }
  
  export function BarChart({
    height = "auto",
    width = "100%",
    title,
    description,
    series,
    colors = ["blue", "green", "purple", "orange", "red"],
    formatter = (value) => value.toString(),
    maxItems = 5,
    className = "",
    onBarClick,
  }: BarChartProps) {
    // Get the first series or return empty if none
    const primarySeries = series[0] || { name: "", data: [] };
    
    // Sort and limit data points
    const sortedData = [...primarySeries.data]
      .sort((a, b) => b.value - a.value)
      .slice(0, maxItems);
    
    // Handle bar click
    const handleClick = (item: ChartDataPoint) => {
      if (onBarClick) {
        onBarClick(item);
      }
    };
    
    return (
      <Card className={`bar-chart__container ${className}`}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle className="bar-chart__title">{title}</CardTitle>}
            {description && <CardDescription className="bar-chart__description">{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div style={{ height, width }} className="flex flex-col justify-center">
            <div className="space-y-4 w-full">
              {sortedData.map((item, i) => (
                <div 
                  key={i} 
                  className="bar-chart__item"
                  onClick={() => handleClick(item)}
                  role={onBarClick ? "button" : undefined}
                  tabIndex={onBarClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (onBarClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleClick(item);
                    }
                  }}
                >
                  <div className="bar-chart__header">
                    <span className="bar-chart__label">{item.label}</span>
                    <span className="bar-chart__value">{formatter(item.value)}</span>
                  </div>
                  <Progress 
                    value={item.value} 
                    max={item.max || 100} 
                    className={`bar-chart__progress--${colors[0]}`}
                    aria-label={`${item.label}: ${formatter(item.value)}`}
                  />
                  {i < sortedData.length - 1 && <div className="bar-chart__divider"></div>}
                </div>
              ))}
              
              {sortedData.length === 0 && (
                <div className="bar-chart__empty">
                  No data available
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  ```

- [ ] Create adapter functions for existing implementations
  ```tsx
  // Adapter for dashboard BarChart
  export function adaptIdeasToChartSeries(ideas: Idea[], toNumber: (value: string | number) => number): ChartSeries[] {
    return [{
      name: "Confidence",
      data: ideas
        .filter(idea => idea.title && (idea.confidence || idea.rating))
        .map(idea => ({
          label: idea.title,
          value: toNumber(idea.confidence),
          originalIdea: idea
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
    }];
  }
  ```

- [ ] Write unit tests
  ```tsx
  // Planned tests - not yet implemented
  describe('BarChart', () => {
    it('renders with basic props', () => {
      const series = [{
        name: 'Test Series',
        data: [
          { label: 'Item 1', value: 75 },
          { label: 'Item 2', value: 50 }
        ]
      }];
      
      render(<BarChart series={series} />);
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });
    
    it('applies formatter when provided', () => {
      const series = [{
        name: 'Test Series',
        data: [{ label: 'Item 1', value: 75 }]
      }];
      
      const formatter = (value: number) => `${value}%`;
      
      render(<BarChart series={series} formatter={formatter} />);
      
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
    
    it('limits items based on maxItems prop', () => {
      const series = [{
        name: 'Test Series',
        data: [
          { label: 'Item 1', value: 75 },
          { label: 'Item 2', value: 50 },
          { label: 'Item 3', value: 25 }
        ]
      }];
      
      render(<BarChart series={series} maxItems={2} />);
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    });
    
    it('calls onBarClick when a bar is clicked', () => {
      const onBarClick = jest.fn();
      const series = [{
        name: 'Test Series',
        data: [{ label: 'Item 1', value: 75 }]
      }];
      
      render(<BarChart series={series} onBarClick={onBarClick} />);
      
      const item = screen.getByText('Item 1').closest('.bar-chart__item');
      fireEvent.click(item);
      
      expect(onBarClick).toHaveBeenCalledTimes(1);
      expect(onBarClick).toHaveBeenCalledWith({ label: 'Item 1', value: 75 });
    });
  });
  ```

### 2. Migration Phase (Planned)

- [ ] Create adapter component for backward compatibility
- [ ] Update imports in all files
- [ ] Test component in all contexts

### 3. Documentation Phase (Planned)

- [ ] Add JSDoc comments
  ```tsx
  /**
   * BarChart component for displaying data as horizontal bars.
   * 
   * @example
   * ```tsx
   * <BarChart
   *   title="Top Projects"
   *   series={[{
   *     name: 'Completion',
   *     data: [
   *       { label: 'Project A', value: 85 },
   *       { label: 'Project B', value: 65 }
   *     ]
   *   }]}
   *   formatter={(value) => `${value}%`}
   * />
   * ```
   */
  ```

- [ ] Document accessibility considerations
  ```markdown
  ## Accessibility
  
  The BarChart component includes the following accessibility features:
  
  - Progress bars have appropriate ARIA labels
  - Interactive bars have keyboard navigation support
  - Color combinations meet WCAG contrast requirements
  - Screen reader friendly structure
  ```

### 4 & 5. Cleanup and Review Phases (Planned)

- [ ] Verify all uses working correctly
- [ ] Conduct code review
- [ ] Verify accessibility compliance

## Migration Status

- [ ] Implementation: Not started
- [ ] Code review: Not started
- [ ] Migration approval: Not started

## Implementation Notes

This document represents the planned approach for migrating the BarChart component. The actual implementation has not yet begun. 

### Current Implementation

Currently, there are two different BarChart implementations:

1. `components/dashboard/BarChart.tsx` - A dashboard-specific implementation that takes ideas data directly and displays confidence and rating metrics using Progress components.

2. `components/charts/bar/BarChart.tsx` - A more generalized implementation that takes standardized series data and displays it using Progress components wrapped in a Card.

The migration will unify these implementations while maintaining the current visual design using the Progress component rather than switching to an SVG-based approach as suggested in the previous documentation.