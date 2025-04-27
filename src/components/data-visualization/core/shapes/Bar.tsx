import React from 'react';
import styles from './Bar.module.css';

export interface BarProps {
  /** X position of the bar */
  x: number;
  /** Y position of the bar */
  y: number;
  /** Width of the bar */
  width: number;
  /** Height of the bar */
  height: number;
  /** Fill color of the bar */
  fill?: string;
  /** Border radius of the bar corners */
  radius?: number;
  /** Whether to use a gradient fill */
  useGradient?: boolean;
  /** Gradient ID if using gradient */
  gradientId?: string;
  /** Additional CSS class */
  className?: string;
  /** Data attributes */
  dataAttributes?: Record<string, string>;
  /** Callback when bar is clicked */
  onClick?: (event: React.MouseEvent) => void;
  /** Callback when mouse enters the bar */
  onMouseEnter?: (event: React.MouseEvent) => void;
  /** Callback when mouse leaves the bar */
  onMouseLeave?: (event: React.MouseEvent) => void;
}

/**
 * Bar component for rendering individual bars in bar charts
 */
export const Bar: React.FC<BarProps> = ({
  x,
  y,
  width,
  height,
  fill = '#3b82f6',
  radius = 0,
  useGradient = false,
  gradientId,
  className = '',
  dataAttributes = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Handle rounded corners
  const rx = Math.min(radius, width / 2, height / 2);
  
  // Create data attribute props
  const dataProps: Record<string, string> = {};
  Object.entries(dataAttributes).forEach(([key, value]) => {
    dataProps[`data-${key}`] = value;
  });

  return (
    <rect
      className={`${styles.bar} ${className}`}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      ry={rx}
      fill={useGradient && gradientId ? `url(#${gradientId})` : fill}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...dataProps}
    />
  );
};

export default Bar;