import { cn } from '@/utils/classnames';
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from 'lucide-react';
import { memo } from 'react';
import { StatCardTrend as StatCardTrendType } from '../StatCard';
import styles from '../StatCard.module.css';

export interface StatCardTrendProps {
  /** Trend data to display */
  trend: StatCardTrendType;
}

const TrendIcon = memo(({ direction }: { direction: "up" | "down" | "neutral" }) => {
  const Icon = direction === 'up' 
    ? ChevronUpIcon 
    : direction === 'down' 
      ? ChevronDownIcon 
      : MinusIcon;
  
  return (
    <span className={styles.trendIcon} aria-hidden="true">
      <Icon className={styles.trendIconSvg} />
    </span>
  );
});
TrendIcon.displayName = 'TrendIcon';

export const StatCardTrend = memo<StatCardTrendProps>(({
  trend
}) => {
  const { value, label, direction, isGood = true } = trend;
  const isPositive = direction === 'up';
  
  const trendClass = cn(
    styles.trendIndicator,
    styles[direction],
    isGood ? styles.good : styles.bad
  );
  
  const formattedTrendValue = `${isPositive ? '+' : ''}${value}`;
  
  return (
    <div 
      className={trendClass}
      aria-label={`Trend: ${formattedTrendValue} ${label}, ${isGood ? 'positive' : 'negative'} trend`}
      data-testid="trend-indicator"
    >
      <TrendIcon direction={direction} />
      <span className={styles.trendValue}>{formattedTrendValue}</span>
      <span className={styles.trendLabel}>{label}</span>
    </div>
  );
});

StatCardTrend.displayName = 'StatCardTrend';