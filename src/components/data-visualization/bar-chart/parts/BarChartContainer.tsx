import React from 'react';
import styles from '../BarChart.module.css';

interface BarChartContainerProps {
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
 * BarChartContainer component for the outer container of the bar chart
 */
const BarChartContainer: React.FC<BarChartContainerProps> = ({
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
      className={`${styles.container} ${className}`} 
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

export default BarChartContainer;