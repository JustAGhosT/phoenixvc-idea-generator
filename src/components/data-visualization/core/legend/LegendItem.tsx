import React from 'react';
import styles from './Legend.module.css';

export interface LegendItemProps {
  /** Unique ID for the item */
  id: string;
  /** Display name */
  name: string;
  /** Color of the item */
  color: string;
  /** Whether the item is visible */
  visible?: boolean;
  /** Symbol type to display */
  symbol?: 'square' | 'circle' | 'line' | 'triangle';
  /** Dash pattern for lines */
  dashPattern?: string;
  /** Whether the item is interactive */
  interactive?: boolean;
  /** Callback when item is toggled */
  onToggle?: (id: string, visible: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * LegendItem component for displaying a single legend entry
 */
export const LegendItem: React.FC<LegendItemProps> = ({
  id,
  name,
  color,
  visible = true,
  symbol = 'square',
  dashPattern,
  interactive = true,
  onToggle,
  className = '',
}) => {
  const handleClick = () => {
    if (interactive && onToggle) {
      onToggle(id, !visible);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && onToggle && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onToggle(id, !visible);
    }
  };
  
  return (
    <div 
      className={`${styles.item} ${interactive ? styles.interactive : ''} ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-pressed={interactive ? !visible : undefined}
    >
      <div 
        className={styles.symbol}
        style={{ 
          backgroundColor: symbol !== 'line' && symbol !== 'triangle' ? color : undefined,
          borderTop: symbol === 'triangle' ? `6px solid ${color}` : undefined,
          borderLeft: symbol === 'triangle' ? '6px solid transparent' : undefined,
          borderRight: symbol === 'triangle' ? '6px solid transparent' : undefined,
          background: symbol === 'triangle' ? 'transparent' : undefined,
          height: symbol === 'line' ? '2px' : '12px',
          width: symbol === 'line' ? '16px' : '12px',
          borderRadius: symbol === 'circle' ? '50%' : '2px',
          opacity: visible ? 1 : 0.3,
        }} 
      />
      <span className={styles.label}>{name}</span>
    </div>
  );
};

export default LegendItem;