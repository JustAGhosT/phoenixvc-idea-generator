"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, AlertCircle, BarChart, CheckCircle, 
  ChevronDown, ChevronUp, Lightbulb, Minus, 
  PieChart, Rocket, TrendingUp, Users 
} from "lucide-react";
import { useId } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
/**
 * Available color variants for the StatCard
 */
export type StatCardVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";

/**
 * Trend information to display with the stat
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
 * @interface StatCardProps
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
}

/**
 * StatCard component for displaying statistics and metrics
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
export const StatCard = ({
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
}: StatCardProps) => {
  // Generate unique IDs for accessibility
  const titleId = useId();
  const descriptionId = useId();
  
  // Determine if the card is interactive
  const isInteractive = !!onClick;
  
  // Get the appropriate icon
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      switch (icon) {
      case "lightbulb":
          return <Lightbulb className="h-5 w-5" aria-hidden="true" />;
      case "check":
          return <CheckCircle className="h-5 w-5" aria-hidden="true" />;
      case "rocket":
          return <Rocket className="h-5 w-5" aria-hidden="true" />;
      case "chart":
          return <BarChart className="h-5 w-5" aria-hidden="true" />;
      case "users":
          return <Users className="h-5 w-5" aria-hidden="true" />;
      case "trending":
          return <TrendingUp className="h-5 w-5" aria-hidden="true" />;
      case "activity":
          return <Activity className="h-5 w-5" aria-hidden="true" />;
      case "pie":
          return <PieChart className="h-5 w-5" aria-hidden="true" />;
        case "alert-circle":
          return <AlertCircle className="h-5 w-5" aria-hidden="true" />;
      default:
        return null;
    }
    }

    // If it's a ReactNode, return it directly
    return icon;
  };
  // Render trend indicator
  const renderTrend = () => {
    if (!trend) return null;

    const { value, label, direction, isGood = true } = trend;
    const isPositive = direction === "up";
    const isNegative = direction === "down";
    const isNeutral = direction === "neutral";
    
    // Determine CSS classes
    const trendClass = `trend-indicator ${direction} ${isGood ? "good" : "bad"}`;
    
    // Determine the icon to use
    const TrendIcon = isPositive ? ChevronUp : isNegative ? ChevronDown : Minus;
    
    // Format the value (always show + for positive values)
    const formattedValue = `${isPositive ? "+" : ""}${value}`;
  return (
      <div 
        className={trendClass}
        aria-label={`Trend: ${formattedValue} ${label}, ${isGood ? "positive" : "negative"} trend`}
    >
        <span className="trend-icon" aria-hidden="true">
          <TrendIcon className="h-3 w-3" />
        </span>
        <span className="trend-value">{formattedValue}</span>
        <span className="trend-label">{label}</span>
          </div>
  );
  };
  
  // Build the CSS class names
  const cardClasses = [
    "stat-card",
    variant,
    loading ? "loading" : "",
    compact ? "compact" : "",
    className
  ].filter(Boolean).join(" ");
  
  // Determine ARIA attributes for the card
  const ariaAttributes = {
    role: isInteractive ? "button" : undefined,
    tabIndex: isInteractive ? 0 : undefined,
    onClick: isInteractive ? onClick : undefined,
    onKeyDown: isInteractive ? (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    } : undefined,
    "aria-labelledby": titleId,
    "aria-describedby": description ? descriptionId : undefined,
    "aria-label": ariaLabel || title,
  };
  
  // Formatted value with prefix and suffix
  const formattedValue = `${valuePrefix}${value}${valueSuffix}`;
  
  // Render the card
  const cardContent = (
    <Card className={cardClasses} {...ariaAttributes}>
      <CardHeader className="card-header">
        <CardTitle id={titleId} className="card-title">{title}</CardTitle>
        {icon && <div className="card-icon">{renderIcon()}</div>}
      </CardHeader>
      <CardContent className="card-content">
        <div className="card-value">
          {loading ? "—" : formattedValue}
        </div>
        {description && (
          <p id={descriptionId} className="card-description">
            {description}
          </p>
        )}
        {renderTrend()}
      </CardContent>
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
