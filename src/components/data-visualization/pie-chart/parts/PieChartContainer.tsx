import React from 'react';
import { ChartAccessibility } from '../../types/chart-config';
import styles from '../PieChart.module.css';

interface PieChartContainerProps {
  width: number | string;
  height: number | string;
  backgroundColor: string;
  showBorder: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
  dataAttributes?: Record<string, string>;
  onClick?: (event: React.MouseEvent) => void;
  accessibility?: ChartAccessibility;
  children: React.ReactNode;
}

export const PieChartContainer: React.FC<PieChartContainerProps> = ({
  width,
  height,
  backgroundColor,
  showBorder,
  borderColor = '#e2e8f0',
  borderWidth = 1,
  borderRadius = 0,
  className = '',
  style = {},
  dataAttributes = {},
  onClick,
  accessibility,
  children,
}) => {
  // Prepare container styles
  const containerStyle: React.CSSProperties = {
    width,
    height,
    backgroundColor,
    position: 'relative',
    ...style,
  };

  // Add border styles if enabled
  if (showBorder) {
    containerStyle.border = `${borderWidth}px solid ${borderColor}`;
    containerStyle.borderRadius = `${borderRadius}px`;
  }

  // Prepare accessibility attributes
  const accessibilityProps: Record<string, string> = {};
  if (accessibility) {
    if (accessibility.labelledBy) {
      accessibilityProps['aria-labelledby'] = accessibility.labelledBy;
    }
    if (accessibility.describedBy) {
      accessibilityProps['aria-describedby'] = accessibility.describedBy;
    }
  }

  return (
    <div
      className={`${styles.container} ${className}`}
      style={containerStyle}
      onClick={onClick}
      role="figure"
      {...accessibilityProps}
      {...dataAttributes}
    >
      {children}
    </div>
  );
};