/**
 * StatCard component
 * 
 * A component for displaying statistics and metrics with support for trends, icons, and various visual styles.
 * 
 * @example
 * ```tsx
 * <StatCard 
 *   title="Total Users" 
 *   value={1234} 
 *   description="Active users this month" 
 *   icon="users"
 *   variant="primary"
 * />
 * ```
 */

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/classnames';
import {
  ActivityIcon,
  AlertCircleIcon,
  BarChartIcon,
  CheckCircleIcon,
  DollarSignIcon,
  LightbulbIcon,
  LineChartIcon,
  PercentIcon,
  PieChartIcon,
  RocketIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon
} from 'lucide-react';
import React, { memo, useCallback, useId, useMemo } from 'react';
import styles from './StatCard.module.css';
import animations from './StatCardAnimations.module.css';
import {
  StatCardDescription,
  StatCardHeader,
  StatCardTrend,
  StatCardValue
} from './parts';

/**
 * Supported color variants for the StatCard
 */
export type StatCardVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";

/**
 * Trend information to display on the StatCard
 */
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

/**
 * Supported icon identifiers for the StatCard
 */
export type StatCardIconIdentifier = 
  | 'lightbulb' 
  | 'check' 
  | 'rocket' 
  | 'chart' 
  | 'users' 
  | 'trending' 
  | 'activity' 
  | 'pie' 
  | 'alert-circle'
  | 'zap'
  | 'line-chart'
  | 'target'
  | 'dollar'
  | 'percent';

/**
 * Props for the StatCard component
 */
export interface StatCardProps {
  /** Title displayed at the top of the card */
  title: string;
  /** Main value to display (can be a string or number) */
  value: string | number;
  /** Optional description text displayed below the value */
  description?: string;
  /** Icon to display (can be a string identifier or a React node) */
  icon?: StatCardIconIdentifier | React.ReactNode;
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
  /** Optional formatter function for the value */
  formatter?: (value: number | string) => string;
  /** Animation effect to apply */
  animation?: 'none' | 'fadeIn' | 'scaleIn' | 'bounceIn' | 'pulse';
  /** Optional data attributes for testing or custom data */
  dataAttributes?: Record<string, string>;
  /** Optional heading level for the title (default is h3) */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// Define a more specific type for the icon components
type IconComponent = React.ComponentType<{ className?: string }>;

/**
 * Maps icon string identifiers to their corresponding components
 */
const iconMap: Record<StatCardIconIdentifier, IconComponent> = {
  'lightbulb': LightbulbIcon,
  'check': CheckCircleIcon,
  'rocket': RocketIcon,
  'chart': BarChartIcon,
  'users': UsersIcon,
  'trending': TrendingUpIcon,
  'activity': ActivityIcon,
  'pie': PieChartIcon,
  'alert-circle': AlertCircleIcon,
  'zap': ZapIcon,
  'line-chart': LineChartIcon,
  'target': TargetIcon,
  'dollar': DollarSignIcon,
  'percent': PercentIcon
};
  
/**
 * StatCard component for displaying statistics and metrics
 */
export const StatCard = memo<StatCardProps>(({
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
  animation = 'none',
  dataAttributes = {},
  headingLevel = 'h3'
}) => {
  // Check if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();
  
  // Generate unique IDs for accessibility
  const titleId = useId();
  const descriptionId = useId();
  
  // Determine if the card is interactive
  const isInteractive = !!onClick;
  
  // Format the value
  const formattedValue = useMemo(() => {
    if (formatter && (typeof value === 'number' || typeof value === 'string')) {
      return formatter(value);
    }
    return `${valuePrefix}${value}${valueSuffix}`;
  }, [value, formatter, valuePrefix, valueSuffix]);
  
  // Handle keyboard interaction for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  }, [isInteractive, onClick]);
  
  // Determine animation class
  const animationClass = useMemo(() => {
    if (prefersReducedMotion || animation === 'none') return '';
    
    switch (animation) {
      case 'fadeIn':
        return animations.fadeIn;
      case 'scaleIn':
        return animations.scaleIn;
      case 'bounceIn':
        return animations.bounceIn;
      case 'pulse':
        return animations.pulseAnimation;
      default:
        return '';
    }
  }, [animation, prefersReducedMotion]);
    
  // Build the CSS class names
  const cardClasses = cn(
    styles.statCard,
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    loading && styles.loading,
    compact && styles.compact,
    isInteractive && !prefersReducedMotion && animations.hoverLift,
    animationClass,
    loading && !prefersReducedMotion && animations.shimmerAnimation,
    className
  );
  
  // Render the icon based on the icon prop
  const iconElement = useMemo(() => {
    if (!icon) return undefined;
    
    if (typeof icon === 'string') {
      const IconComponent = iconMap[icon as StatCardIconIdentifier];
      if (IconComponent) {
        return <IconComponent className={styles.icon} aria-hidden="true" />;
    }
      return null;
    }
    return icon;
  }, [icon]);
  
  // Prepare data attributes
  const dataProps = Object.entries(dataAttributes).reduce((acc, [key, value]) => {
    acc[`data-${key}`] = value;
    return acc;
  }, {} as Record<string, string>);
  
  // Create the card content
  const cardContent = (
    <article 
      className={cardClasses}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-label={ariaLabel || title}
      aria-busy={loading}
      {...dataProps}
    >
      <StatCardHeader 
        title={title} 
        titleId={titleId} 
        icon={iconElement}
        headingLevel={headingLevel}
      />
      
      <div className={styles.content}>
        <StatCardValue 
          formattedValue={formattedValue} 
          loading={loading} 
        />
        
        {description && (
          <StatCardDescription 
            description={description} 
            descriptionId={descriptionId} 
          />
        )}
        
        {trend && <StatCardTrend trend={trend} />}
      </div>
    </article>
    );
  
  // Wrap with tooltip if tooltipContent is provided
  if (tooltipContent) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return cardContent;
});

StatCard.displayName = 'StatCard';

export default StatCard;