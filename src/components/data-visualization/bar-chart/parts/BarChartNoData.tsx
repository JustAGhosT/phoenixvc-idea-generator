import React from 'react';
import styles from '../BarChart.module.css';

interface BarChartNoDataProps {
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Custom message to display */
  message?: string;
}

/**
 * BarChartNoData component for displaying a message when no data is available
 */
const BarChartNoData: React.FC<BarChartNoDataProps> = ({
  width,
  height,
  message = "No data available",
}) => {
  return (
    <text 
      x={width / 2} 
      y={height / 2} 
      textAnchor="middle" 
      className={styles.barChartEmpty}
    >
      {message}
    </text>
  );
};

export default BarChartNoData;