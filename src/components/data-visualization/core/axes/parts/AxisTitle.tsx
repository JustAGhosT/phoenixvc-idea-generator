import React from 'react';
import styles from '../Axis.module.css';

interface AxisTitleProps {
  /** Title text */
  title: string;
  /** Whether this is an X axis */
  isXAxis: boolean;
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
}

/**
 * AxisTitle component for rendering the axis title
 */
const AxisTitle: React.FC<AxisTitleProps> = ({
  title,
  isXAxis,
  width,
  height,
}) => {
  return (
    <text
      className={styles.axisTitle}
      x={isXAxis ? width / 2 : -height / 2}
      y={isXAxis ? 30 : -30}
      textAnchor="middle"
      transform={isXAxis ? undefined : 'rotate(-90)'}
    >
      {title}
    </text>
  );
};

export default AxisTitle;