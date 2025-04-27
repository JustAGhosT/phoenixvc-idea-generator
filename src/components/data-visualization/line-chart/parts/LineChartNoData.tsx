import React from 'react';
import styles from '../LineChart.module.css';

interface LineChartNoDataProps {
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Custom message to display */
  message?: string;
}

/**
 * LineChartNoData component for displaying a message when no data is available
 */
const LineChartNoData: React.FC<LineChartNoDataProps> = ({
  width,
  height,
  message = "No data available",
}) => {
  return (
    <text 
      x={width / 2} 
      y={height / 2} 
      textAnchor="middle" 
      className={styles.empty}
    >
      {message}
    </text>
  );
};

export default LineChartNoData;