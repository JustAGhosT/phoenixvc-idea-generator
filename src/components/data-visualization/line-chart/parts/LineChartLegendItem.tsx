import React from 'react';
import styles from '../LineChart.module.css';

export interface LineChartLegendItemProps {
  /** Unique ID for the item */
  id: string;
  /** Display name */
  name: string;
  /** Color of the line */
  color: string;
  /** Whether the item is visible */
  visible?: boolean;
  /** Line style (solid, dashed, dotted) */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  /** Whether to show a point */
  showPoint?: boolean;
  /** Whether the item is interactive */
  interactive?: boolean;
  /** Callback when item is toggled */
  onToggle?: (id: string, visible: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * LineChartLegendItem component for displaying a single line chart legend entry
 */
export const LineChartLegendItem: React.FC<LineChartLegendItemProps> = ({
  id,
  name,
  color,
  visible = true,
  lineStyle = 'solid',
  showPoint = true,
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
  
  // Determine dash array for line style
  const dashArray = lineStyle === 'solid' ? 'none' : 
                    lineStyle === 'dashed' ? '4,2' : '2,2';
  
  return (
    <div 
      className={`${styles.legendItem} ${interactive ? styles.interactive : ''} ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-pressed={interactive ? !visible : undefined}
      style={{ opacity: visible ? 1 : 0.5 }}
    >
      <div className={styles.legendSymbol}>
        <svg width="24" height="12" viewBox="0 0 24 12">
          {/* Line */}
          <line 
            x1="2" 
            y1="6" 
            x2="22" 
            y2="6" 
            stroke={color} 
            strokeWidth="2" 
            strokeDasharray={dashArray}
            strokeLinecap="round"
          />
          
          {/* Point */}
          {showPoint && (
            <circle 
              cx="12" 
              cy="6" 
              r="3" 
              fill={color} 
              stroke="white" 
              strokeWidth="1"
            />
          )}
        </svg>
      </div>
      <span className={styles.legendLabel}>{name}</span>
    </div>
  );
};

export default LineChartLegendItem;