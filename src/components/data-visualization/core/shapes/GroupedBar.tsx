import React from 'react';
import Bar from './Bar';
import styles from './Bar.module.css';

export interface GroupedBarSegment {
  /** Value of the segment */
  value: number;
  /** Color of the segment */
  color: string;
  /** Label for the segment */
  label?: string;
  /** Data attributes */
  dataAttributes?: Record<string, string>;
}

export interface GroupedBarProps {
  /** X position of the bar group */
  x: number;
  /** Y position of the bar group (bottom of the bars) */
  y: number;
  /** Total width available for the group */
  totalWidth: number;
  /** Height of the chart area */
  height: number;
  /** Segments to group */
  segments: GroupedBarSegment[];
  /** Maximum value (for scaling) */
  maxValue: number;
  /** Gap between bars as a fraction of bar width */
  barGap?: number;
  /** Border radius of the bar corners */
  radius?: number;
  /** Additional CSS class */
  className?: string;
  /** Callback when a segment is clicked */
  onSegmentClick?: (segment: GroupedBarSegment, index: number, event: React.MouseEvent) => void;
  /** Callback when mouse enters a segment */
  onSegmentMouseEnter?: (segment: GroupedBarSegment, index: number, event: React.MouseEvent) => void;
  /** Callback when mouse leaves a segment */
  onSegmentMouseLeave?: (segment: GroupedBarSegment, index: number, event: React.MouseEvent) => void;
}

/**
 * GroupedBar component for rendering grouped bar segments
 */
export const GroupedBar: React.FC<GroupedBarProps> = ({
  x,
  y,
  totalWidth,
  height,
  segments,
  maxValue,
  barGap = 0.2,
  radius = 0,
  className = '',
  onSegmentClick,
  onSegmentMouseEnter,
  onSegmentMouseLeave,
}) => {
  if (!segments || segments.length === 0) return null;
  
  // Calculate bar width
  const barCount = segments.length;
  const barWidth = (totalWidth / barCount) * (1 - barGap);
  const gapWidth = (totalWidth - barWidth * barCount) / (barCount + 1);
  
  return (
    <g className={`${styles.groupedBar} ${className}`}>
      {segments.map((segment, index) => {
        // Calculate segment position and height
        const segmentX = x + gapWidth + (barWidth + gapWidth) * index;
        const segmentHeight = (segment.value / maxValue) * height;
        
        return (
          <Bar
            key={`segment-${index}`}
            x={segmentX}
            y={y - segmentHeight}
            width={barWidth}
            height={segmentHeight}
            fill={segment.color}
            radius={radius}
            dataAttributes={{
              ...segment.dataAttributes,
              label: segment.label || '',
              value: String(segment.value),
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

export default GroupedBar;