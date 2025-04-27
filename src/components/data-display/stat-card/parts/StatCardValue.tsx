import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/classnames';
import { memo } from 'react';
import styles from '../StatCard.module.css';
import animations from '../StatCardAnimations.module.css';

export interface StatCardValueProps {
  /** The formatted value to display */
  formattedValue: string;
  /** Whether the card is in loading state */
  loading?: boolean;
}

export const StatCardValue = memo<StatCardValueProps>(({
  formattedValue,
  loading = false
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={cn(
      styles.value,
      loading && !prefersReducedMotion && animations.shimmerAnimation
    )}>
      {loading ? '—' : formattedValue}
    </div>
  );
});

StatCardValue.displayName = 'StatCardValue';