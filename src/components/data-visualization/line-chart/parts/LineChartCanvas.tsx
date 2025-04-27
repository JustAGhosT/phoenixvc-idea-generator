import React, { useCallback } from 'react';
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
  
  // Create a wrapper component that will receive width and height from ChartCanvas
  const ChartContent = useCallback(({ width, height }: { width: number, height: number }) => {
    return <>{children(width, height)}</>;
  }, [children]);
  
  return (
    <ChartCanvas
      width={width}
      height={actualHeight}
      margin={margin}
      backgroundColor={backgroundColor}
    >
      <ChartContent width={0} height={0} />
    </ChartCanvas>
  );
};

export default LineChartCanvas;