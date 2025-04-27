import React from 'react';
import styles from '../Axis.module.css';

interface AxisLineProps {
  /** Whether this is an X axis */
  isXAxis: boolean;
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
}

/**
 * AxisLine component for rendering the main axis line
 */
const AxisLine: React.FC<AxisLineProps> = ({
  isXAxis,
  width,
  height,
}) => {
  return (
    <line
      className={styles.axisLine}
      x1={isXAxis ? 0 : 0}
      y1={isXAxis ? 0 : 0}
      x2={isXAxis ? width : 0}
      y2={isXAxis ? 0 : height}
    />
  );
};

export default AxisLine;