import React from 'react';
import styles from './AxisMarker.module.css';

interface AxisMarkerProps {
  /** Type of axis (x or y) */
  axis: 'x' | 'y';
  /** Position on the axis (in pixels) */
  position: number;
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Marker label */
  label?: string;
  /** Marker color */
  color?: string;
  /** Marker line style */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  /** Marker line width */
  lineWidth?: number;
  /** Whether to show a label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'start' | 'middle' | 'end';
  /** Additional CSS class */
  className?: string;
}

/**
 * AxisMarker component for highlighting specific points or values on an axis
 */
export const AxisMarker: React.FC<AxisMarkerProps> = ({
  axis,
  position,
  width,
  height,
  label,
  color = 'var(--color-primary, #3b82f6)',
  lineStyle = 'dashed',
  lineWidth = 1,
  showLabel = true,
  labelPosition = 'end',
  className = '',
}) => {
  const isXAxis = axis === 'x';
  
  // Determine line dash pattern
  const dashArray = lineStyle === 'solid' ? 'none' : 
                    lineStyle === 'dashed' ? '4,4' : '2,2';
  
  // Determine label position
  let labelX = 0;
  let labelY = 0;
  let textAnchor = 'start';
  
  if (isXAxis) {
    labelX = position;
    labelY = labelPosition === 'start' ? 0 : 
             labelPosition === 'middle' ? height / 2 : 
             height;
    textAnchor = 'middle';
  } else {
    labelX = labelPosition === 'start' ? 0 : 
             labelPosition === 'middle' ? width / 2 : 
             width;
    labelY = position;
    textAnchor = labelPosition === 'start' ? 'start' : 
                 labelPosition === 'middle' ? 'middle' : 
                 'end';
  }
  
  return (
    <g className={`${styles.marker} ${className}`}>
      <line
        className={styles.line}
        x1={isXAxis ? position : 0}
        y1={isXAxis ? 0 : position}
        x2={isXAxis ? position : width}
        y2={isXAxis ? height : position}
        stroke={color}
        strokeWidth={lineWidth}
        strokeDasharray={dashArray}
      />
      
      {showLabel && label && (
        <text
          className={styles.label}
          x={labelX}
          y={labelY}
          dy={isXAxis ? (labelPosition === 'start' ? '-0.5em' : '1em') : '0.3em'}
          dx={!isXAxis ? (labelPosition === 'start' ? '0.5em' : '-0.5em') : 0}
          textAnchor={textAnchor}
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisMarker;