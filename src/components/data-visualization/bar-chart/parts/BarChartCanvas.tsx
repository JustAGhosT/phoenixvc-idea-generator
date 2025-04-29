import React from 'react';
import { ChartCanvas } from '../../core';
import { ChartMargin } from '../../types/chart-config';

interface BarChartCanvasProps {
  /** Width of the chart */
  width: string | number;
  /** Height of the chart */
  height: string | number;
  /** Margin around the chart */
  margin: ChartMargin;
  /** Background color */
  backgroundColor?: string;
  /** Render function for chart content */
  children: (width: number, height: number) => React.ReactNode;
}

/**
 * BarChartCanvas component for rendering the chart canvas
 */
const BarChartCanvas: React.FC<BarChartCanvasProps> = ({
  width,
  height,
  margin,
  backgroundColor = 'transparent',
  children,
}) => {
  // Calculate actual height (subtracting header height if needed)
  const actualHeight = typeof height === 'number' ? height - 60 : height;
  
  // Pass the children function directly to ChartCanvas
  // The updated ChartCanvas component can now handle function children
  return (
    <ChartCanvas
      width={width}
      height={actualHeight}
      margin={margin}
      backgroundColor={backgroundColor}
    >
      {children}
    </ChartCanvas>
  );
};

export default BarChartCanvas;