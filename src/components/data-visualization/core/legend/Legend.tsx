import React from 'react';
import styles from './Legend.module.css';
import LegendItem, { LegendItemProps } from './LegendItem';

export interface LegendProps {
  /** Array of legend items */
  items: Omit<LegendItemProps, 'onToggle'>[];
  /** Legend position */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Legend layout */
  layout?: 'horizontal' | 'vertical';
  /** Whether items can be clicked to toggle visibility */
  interactive?: boolean;
  /** Maximum number of items to show before scrolling */
  maxItems?: number;
  /** Custom formatter for legend items */
  formatItem?: (item: Omit<LegendItemProps, 'onToggle'>) => React.ReactNode;
  /** Callback when an item is toggled */
  onItemToggle?: (itemId: string, visible: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Legend component for displaying chart series or categories
 */
export const Legend: React.FC<LegendProps> = ({
  items,
  position = 'bottom',
  layout = 'horizontal',
  interactive = true,
  maxItems,
  formatItem,
  onItemToggle,
  className = '',
}) => {
  // Determine if we need scrolling
  const needsScrolling = maxItems && items.length > maxItems;
  
  // Determine layout class
  const layoutClass = layout === 'horizontal' ? styles.horizontal : styles.vertical;
  const positionClass = styles[position];
  
  return (
    <div className={`${styles.legend} ${layoutClass} ${positionClass} ${className}`}>
      <div className={needsScrolling ? styles.scrollContainer : ''}>
        {items.map((item) => (
          formatItem ? (
            <div key={item.id}>
              {formatItem(item)}
            </div>
          ) : (
            <LegendItem
              key={item.id}
              {...item}
              interactive={interactive}
              onToggle={onItemToggle}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Legend;