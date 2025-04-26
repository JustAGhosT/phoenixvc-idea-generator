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

import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@utils/classnames';
import {
  ActivityIcon,
  AlertCircleIcon,
  BarChartIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LightbulbIcon,
  MinusIcon,
  PieChartIcon,
  RocketIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react';
import React, { useId } from 'react';
import styles from './StatCard.less';

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
  /** Optional formatter function for the value */
  formatter?: (value: number | string) => string;
}

/**
 * StatCard component for displaying statistics and metrics
 */
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
  formatter
}) => {
  // Generate unique IDs for accessibility
  const titleId = useId();
  const descriptionId = useId();
  
  // Determine if the card is interactive
  const isInteractive = !!onClick;
  
  // Build the CSS class names
  const cardClasses = cn(
    styles.statCard,
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    loading && styles.loading,
    compact && styles.compact,
    className
  );
  
  // ARIA attributes for accessibility
  const ariaAttributes = {
    role: isInteractive ? 'button' : undefined,
    tabIndex: isInteractive ? 0 : undefined,
    onClick: isInteractive ? onClick : undefined,
    onKeyDown: isInteractive ? (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    } : undefined,
    'aria-labelledby': titleId,
    'aria-describedby': description ? descriptionId : undefined,
    'aria-label': ariaLabel || title
  };
  
  // Format the value
  let formattedValue: string;
  if (formatter && (typeof value === 'number' || typeof value === 'string')) {
    formattedValue = formatter(value);
  } else {
    formattedValue = `${valuePrefix}${value}${valueSuffix}`;
  }
  
  // Render the icon based on the icon prop
  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === 'string') {
      switch (icon) {
        case 'lightbulb':
          return <LightbulbIcon className={styles.icon} aria-hidden="true" />;
        case 'check':
          return <CheckCircleIcon className={styles.icon} aria-hidden="true" />;
        case 'rocket':
          return <RocketIcon className={styles.icon} aria-hidden="true" />;
        case 'chart':
          return <BarChartIcon className={styles.icon} aria-hidden="true" />;
        case 'users':
          return <UsersIcon className={styles.icon} aria-hidden="true" />;
        case 'trending':
          return <TrendingUpIcon className={styles.icon} aria-hidden="true" />;
        case 'activity':
          return <ActivityIcon className={styles.icon} aria-hidden="true" />;
        case 'pie':
          return <PieChartIcon className={styles.icon} aria-hidden="true" />;
        case 'alert-circle':
          return <AlertCircleIcon className={styles.icon} aria-hidden="true" />;
        default:
          return null;
      }
    }
    
    return icon;
  };
  
  // Render the trend indicator
  const renderTrend = () => {
    if (!trend) return null;
    
    const { value, label, direction, isGood = true } = trend;
    const isPositive = direction === 'up';
    const isNegative = direction === 'down';
    
    const trendClass = cn(
      styles.trendIndicator,
      styles[direction],
      isGood ? styles.good : styles.bad
    );
    
    const TrendIcon = isPositive 
      ? ChevronUpIcon 
      : isNegative 
        ? ChevronDownIcon 
        : MinusIcon;
    
    const formattedTrendValue = `${isPositive ? '+' : ''}${value}`;
    
    return (
      <div 
        className={trendClass}
        aria-label={`Trend: ${formattedTrendValue} ${label}, ${isGood ? 'positive' : 'negative'} trend`}
        data-testid="trend-indicator"
      >
        <span className={styles.trendIcon} aria-hidden="true">
          <TrendIcon className={styles.trendIconSvg} />
        </span>
        <span className={styles.trendValue}>{formattedTrendValue}</span>
        <span className={styles.trendLabel}>{label}</span>
      </div>
    );
  };
  
  // Create the card content
  const cardContent = (
    <Card className={cardClasses} {...ariaAttributes}>
      <div className={styles.header}>
        <h3 id={titleId} className={styles.title}>{title}</h3>
        {icon && <div className={styles.iconContainer}>{renderIcon()}</div>}
      </div>
      <div className={styles.content}>
        <div className={styles.value}>
          {loading ? '—' : formattedValue}
        </div>
        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}
        {renderTrend()}
      </div>
    </Card>
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
};

export default StatCard;