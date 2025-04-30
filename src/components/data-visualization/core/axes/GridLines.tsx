import React from 'react';
import styles from './GridLines.module.css';

interface GridLinesProps {
  /** Type of grid lines (x or y) */
  type: 'x' | 'y';
  /** Scale function that converts domain values to pixel values */
  scale: any; // This would typically be a d3 scale function
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Custom tick values */
  tickValues?: any[];
  /** Number of ticks to display */
  tickCount?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * GridLines component for rendering background grid lines
 */
export const GridLines: React.FC<GridLinesProps> = ({
  type,
  scale,
  width,
  height,
  tickValues,
  tickCount = 5,
  className = '',
}) => {
  // Generate tick values if not provided
  const ticks = tickValues || (scale.ticks ? scale.ticks(tickCount) : scale.domain());
  const isXAxis = type === 'x';

  return (
    <g className={`${styles.gridLines} ${className}`}>
      {ticks.map((tick: any, i: number) => {
        const position = scale(tick);
        
        return (
          <line
            key={`${type}-grid-${i}`}
            className={styles.axisGridLine}
            x1={isXAxis ? position : 0}
            y1={isXAxis ? 0 : position}
            x2={isXAxis ? position : width}
            y2={isXAxis ? height : position}
          />
        );
      })}
    </g>
  );
};

export default GridLines;