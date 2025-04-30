import React from 'react';
import styles from '../LineChart.module.css';

interface LineChartContainerProps {
  /** Width of the chart */
  width: string | number;
  /** Height of the chart */
  height: string | number;
  /** Whether to show a border */
  showBorder?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Data attributes */
  dataAttributes?: Record<string, string>;
  /** Children to render inside the container */
  children: React.ReactNode;
}

/**
 * LineChartContainer component for the outer container of the line chart
 */
const LineChartContainer: React.FC<LineChartContainerProps> = ({
  width,
  height,
  showBorder = false,
  borderColor,
  borderWidth,
  borderRadius,
  className = "",
  style,
  dataAttributes,
  children,
}) => {
  return (
    <div 
      className={`${styles.lineChartContainer} ${className}`} 
      style={{ 
        width, 
        height, 
        backgroundColor: 'transparent',
        borderRadius: borderRadius ? `${borderRadius}px` : undefined,
        border: showBorder ? `${borderWidth || 1}px solid ${borderColor || 'var(--border-color, #e2e8f0)'}` : undefined,
        ...style 
      }}
      {...dataAttributes}
    >
      {children}
    </div>
  );
};

export default LineChartContainer;