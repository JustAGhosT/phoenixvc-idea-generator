import React from 'react';
import { ChartCanvas } from '../../core';
import { ChartMargin } from '../../types/chart-config';

interface LineChartCanvasProps {
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
 * LineChartCanvas component for rendering the chart canvas
 */
const LineChartCanvas: React.FC<LineChartCanvasProps> = ({
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

export default LineChartCanvas;