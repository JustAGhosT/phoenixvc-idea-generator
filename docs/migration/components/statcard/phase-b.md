# StatCard Component Migration - Phase B

This checklist will cover the implementation, migration, documentation, cleanup, and review phases for the StatCard component.

## Component Name: StatCard

### 1. Implementation Phase (Planned)

- [ ] Create LESS module
  ```less
  // Planned structure for StatCard.less
  .stat-card {
    // Base styles
    display: flex;
    flex-direction: column;
    
    // Variants
    &--default { 
      background-color: @background-card;
      color: @text-primary;
    }
    &--primary { 
      background-color: @primary-light;
      color: @primary-dark;
    }
    &--success { 
      background-color: @success-light;
      color: @success-dark;
    }
    &--warning { 
      background-color: @warning-light;
      color: @warning-dark;
    }
    &--danger { 
      background-color: @danger-light;
      color: @danger-dark;
    }
    &--info { 
      background-color: @info-light;
      color: @info-dark;
    }
    
    // States
    &--loading {
      .stat-card__value {
        opacity: 0.5;
      }
    }
    &--compact { 
      padding: @spacing-sm;
      .stat-card__title {
        font-size: @font-size-sm;
      }
      .stat-card__value {
        font-size: @font-size-lg;
      }
    }
    &--interactive { 
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
    
    // Elements
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: @spacing-sm;
    }
    &__title {
      font-size: @font-size-base;
      font-weight: 500;
      margin: 0;
    }
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__content {
      flex: 1;
    }
    &__value {
      font-size: @font-size-xl;
      font-weight: 700;
      margin: @spacing-xs 0;
    }
    &__description {
      font-size: @font-size-sm;
      color: @text-secondary;
      margin: 0;
    }
    &__trend {
      display: flex;
      align-items: center;
      font-size: @font-size-sm;
      margin-top: @spacing-xs;
      
      &-icon {
        margin-right: @spacing-xs;
      }
      
      &-value {
        font-weight: 500;
        margin-right: @spacing-xs;
      }
      
      &-label {
        color: @text-secondary;
      }
      
      &--up.good { color: @success; }
      &--down.good { color: @danger; }
      &--up.bad { color: @danger; }
      &--down.bad { color: @success; }
      &--neutral { color: @text-secondary; }
    }
  }
  ```

- [ ] Implement component with LESS module
  ```tsx
  // Planned implementation - not yet implemented
  import React, { useId } from 'react';
  import { 
    Activity, AlertCircle, BarChart, CheckCircle, 
    ChevronDown, ChevronUp, Lightbulb, Minus, 
    PieChart, Rocket, TrendingUp, Users 
  } from "lucide-react";
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
  import './StatCard.less';
  
  // Types remain the same as current implementation
  export type StatCardVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
  
  export interface StatCardTrend {
    value: number;
    label: string;
    direction: "up" | "down" | "neutral";
    isGood?: boolean;
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
    formatter?: (value: number | string) => string;
  }
  
  export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    description,
    icon,
    trend,
    variant = "default",
    loading = false,
    className = "",
    valuePrefix = "",
    valueSuffix = "",
    onClick,
    compact = false,
    tooltipContent,
    ariaLabel,
    formatter,
  }) => {
    // Implementation similar to current component but using LESS classes
    // and incorporating the formatter functionality
    
    // Generate unique IDs for accessibility
    const titleId = useId();
    const descriptionId = useId();
    
    // Format the value if formatter is provided
    const formattedValue = formatter && typeof value === 'number' 
      ? formatter(value) 
      : `${valuePrefix}${value}${valueSuffix}`;
    
    // Determine if the card is interactive
    const isInteractive = !!onClick;
    
    // Build the CSS class names using LESS module classes
    const cardClasses = [
      'stat-card',
      `stat-card--${variant}`,
      loading ? 'stat-card--loading' : '',
      compact ? 'stat-card--compact' : '',
      isInteractive ? 'stat-card--interactive' : '',
      className
    ].filter(Boolean).join(' ');
    
    // Rest of implementation similar to current component...
  };
  ```

- [ ] Write unit tests
  ```tsx
  // Planned tests - not yet implemented
  describe('StatCard', () => {
    it('renders with basic props', () => {
      render(<StatCard title="Users" value={1234} />);
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('1234')).toBeInTheDocument();
    });
    
    it('applies formatter when provided', () => {
      const formatter = (value: number | string) => `$${value}`;
      render(<StatCard title="Revenue" value={1000} formatter={formatter} />);
      expect(screen.getByText('$1000')).toBeInTheDocument();
    });
    
    it('handles string values correctly', () => {
      render(<StatCard title="Status" value="Active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
    
    it('displays trend information', () => {
      render(
        <StatCard 
          title="Growth" 
          value={15} 
          trend={{
            value: 5.2,
            direction: 'up',
            label: 'vs last month',
            isGood: true
          }}
        />
      );
      
      expect(screen.getByText('+5.2')).toBeInTheDocument();
      expect(screen.getByText('vs last month')).toBeInTheDocument();
    });
    
    it('is interactive when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<StatCard title="Clickable" value={100} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      fireEvent.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  ```

### 2. Migration Phase (Planned)

- [ ] Create adapter component for backward compatibility
  ```tsx
  // Planned adapter - not yet implemented
  import { StatCard as NewStatCard } from './StatCard';
  import type { StatCardProps as OldStatCardProps } from '../components/common/cards/StatCard';
  
  export function LegacyStatCard(props: OldStatCardProps) {
    // Map old props to new props
    return <NewStatCard {...props} />;
  }
  ```

- [ ] Update imports in all files
- [ ] Test component in all contexts

### 3. Documentation Phase (Planned)

- [ ] Add JSDoc comments
- [ ] Document accessibility considerations
- [ ] Create Storybook stories

### 4 & 5. Cleanup and Review Phases (Planned)

- [ ] Verify all uses working correctly
- [ ] Conduct code review
- [ ] Verify accessibility compliance

## Migration Status

- [ ] Implementation: Not started
- [ ] Code review: Not started
- [ ] Migration approval: Not started

## Implementation Notes

This document represents the planned approach for migrating the StatCard component. The actual implementation has not yet begun. The current StatCard component is implemented in `components/common/cards/StatCard.tsx` and already has a well-designed API with good accessibility features.

### Current Implementation

The current StatCard component is a feature-rich component with support for various display options, trends, tooltips, and accessibility features. The migration will preserve all current functionality while standardizing the styling approach with LESS modules and ensuring consistency with other components in the new system.