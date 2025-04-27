import React from 'react';
import styles from '../Axis.module.css';

interface AxisTickProps {
  /** Whether this is an X axis */
  isXAxis: boolean;
  /** Position of the tick on the axis */
  position: number;
  /** Value of the tick */
  value: any;
  /** Format function for the tick label */
  format: (value: any) => string;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
}

/**
 * AxisTick component for rendering individual ticks on an axis
 */
const AxisTick: React.FC<AxisTickProps> = ({
  isXAxis,
  position,
  value,
  format,
  showGrid = false,
  width,
  height,
}) => {
  return (
    <g
      className={styles.tick}
      transform={isXAxis ? `translate(${position}, 0)` : `translate(0, ${position})`}
    >
      {/* Tick mark */}
      <line
        className={styles.tickLine}
        x1={isXAxis ? 0 : -6}
        y1={isXAxis ? 0 : 0}
        x2={isXAxis ? 0 : 0}
        y2={isXAxis ? 6 : 0}
      />
      
      {/* Grid line */}
      {showGrid && (
        <line
          className={styles.gridLine}
          x1={isXAxis ? 0 : 0}
          y1={isXAxis ? 0 : 0}
          x2={isXAxis ? 0 : width}
          y2={isXAxis ? -height : 0}
        />
      )}
      
      {/* Tick label */}
      <text
        className={styles.tickLabel}
        x={isXAxis ? 0 : -8}
        y={isXAxis ? 9 : 0}
        dy={isXAxis ? '0.71em' : '0.32em'}
        textAnchor={isXAxis ? 'middle' : 'end'}
      >
        {format(value)}
      </text>
    </g>
  );
};

export default AxisTick;