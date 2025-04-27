import React from 'react';
import Bar from './Bar';
import styles from './Bar.module.css';

export interface StackedBarSegment {
  /** Value of the segment */
  value: number;
  /** Color of the segment */
  color: string;
  /** Label for the segment */
  label?: string;
  /** Data attributes */
  dataAttributes?: Record<string, string>;
}

export interface StackedBarProps {
  /** X position of the bar */
  x: number;
  /** Y position of the bar (bottom of the bar) */
  y: number;
  /** Width of the bar */
  width: number;
  /** Total height available */
  totalHeight: number;
  /** Segments to stack */
  segments: StackedBarSegment[];
  /** Maximum value (for scaling) */
  maxValue: number;
  /** Border radius of the bar corners (only applied to top and bottom segments) */
  radius?: number;
  /** Additional CSS class */
  className?: string;
  /** Callback when a segment is clicked */
  onSegmentClick?: (segment: StackedBarSegment, index: number, event: React.MouseEvent) => void;
  /** Callback when mouse enters a segment */
  onSegmentMouseEnter?: (segment: StackedBarSegment, index: number, event: React.MouseEvent) => void;
  /** Callback when mouse leaves a segment */
  onSegmentMouseLeave?: (segment: StackedBarSegment, index: number, event: React.MouseEvent) => void;
}

/**
 * StackedBar component for rendering stacked bar segments
 */
export const StackedBar: React.FC<StackedBarProps> = ({
  x,
  y,
  width,
  totalHeight,
  segments,
  maxValue,
  radius = 0,
  className = '',
  onSegmentClick,
  onSegmentMouseEnter,
  onSegmentMouseLeave,
}) => {
  if (!segments || segments.length === 0) return null;
  
  // Calculate total value
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  
  // Render segments
  let currentY = y;
  
  return (
    <g className={`${styles.stackedBar} ${className}`}>
      {segments.map((segment, index) => {
        // Calculate segment height based on value
        const segmentHeight = (segment.value / maxValue) * totalHeight;
        
        // Apply radius only to top and bottom segments
        const isFirstSegment = index === 0;
        const isLastSegment = index === segments.length - 1;
        const segmentRadius = isFirstSegment || isLastSegment ? radius : 0;
        
        // Calculate new Y position for next segment
        const segmentY = currentY - segmentHeight;
        currentY = segmentY;
        
        return (
          <Bar
            key={`segment-${index}`}
            x={x}
            y={segmentY}
            width={width}
            height={segmentHeight}
            fill={segment.color}
            radius={segmentRadius}
            dataAttributes={{
              ...segment.dataAttributes,
              label: segment.label || '',
              value: String(segment.value),
              percentage: String(Math.round((segment.value / totalValue) * 100)),
            }}
            onClick={(e) => onSegmentClick?.(segment, index, e)}
            onMouseEnter={(e) => onSegmentMouseEnter?.(segment, index, e)}
            onMouseLeave={(e) => onSegmentMouseLeave?.(segment, index, e)}
          />
        );
      })}
    </g>
  );
};

export default StackedBar;