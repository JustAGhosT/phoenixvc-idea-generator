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
  symbol?: 'square' | 'circle' | 'line' | 'triangle' | 'bar';
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
  
  // Render symbol based on type
  const renderSymbol = () => {
    const opacity = visible ? 1 : 0.3;
    
    if (symbol === 'line') {
      // Line symbol with optional point
  return (
        <div className={styles.legendLineSymbol}>
          <svg width="24" height="12" viewBox="0 0 24 12">
            <line 
              x1="2" 
              y1="6" 
              x2="22" 
              y2="6" 
              stroke={color} 
              strokeWidth="2" 
              strokeDasharray={dashPattern || 'none'} 
              strokeLinecap="round"
              opacity={opacity}
      />
            <circle 
              cx="12" 
              cy="6" 
              r="3" 
              fill={color} 
              stroke="white" 
              strokeWidth="1"
              opacity={opacity}
            />
          </svg>
    </div>
  );
    }
    
    if (symbol === 'bar') {
      // Bar symbol
      return (
        <div 
          className={styles.legendBarSymbol}
          style={{ 
            backgroundColor: color,
            opacity,
            borderRadius: '2px'
          }}
        />
      );
    }
    
    if (symbol === 'triangle') {
      // Triangle symbol
      return (
        <div 
          className={styles.legendSymbol}
          style={{ 
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `12px solid ${color}`,
            backgroundColor: 'transparent',
            opacity,
          }}
        />
      );
    }
    
    // Default square or circle
    return (
      <div 
        className={styles.legendSymbol}
        style={{ 
          backgroundColor: color,
          borderRadius: symbol === 'circle' ? '50%' : '2px',
          opacity,
        }} 
      />
    );
};

  return (
    <div 
      className={`${styles.legendItem} ${interactive ? styles.legendInteractive : ''} ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-pressed={interactive ? !visible : undefined}
    >
      {renderSymbol()}
      <span className={styles.legendLabel}>{name}</span>
    </div>
  );
};

export default LegendItem;