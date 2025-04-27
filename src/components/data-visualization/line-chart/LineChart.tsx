import React, { useMemo, useState } from 'react';
import { ChartDataPoint, ChartSeries } from '../types/base-types';
import { ChartAxis } from '../types/index';
import { LineChartProps } from '../types/line-chart-types';

import { LineChartAnimation, LineChartAxes, LineChartCanvas, LineChartContainer, LineChartHeader, LineChartLegend, LineChartLines, LineChartNoData, LineChartPoints, LineChartTooltip } from './parts';
import { defaultColors, processLineChartData } from './parts/LineChartUtils';

/**
 * LineChart component for displaying data as lines or area charts.
 * 
 * @example
 * ```tsx
 * <LineChart
 *   title="Monthly Revenue"
 *   data={[
 *     { label: 'Jan', value: 1000 },
 *     { label: 'Feb', value: 1500 }
 *   ]}
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  subtitle,
  width = "100%",
  height = 300,
  showArea = false,
  showPoints = true,
  curved = false,
  lineWidth = 2,
  pointRadius = 4,
  showDataLabels = false,
  xAxis,
  yAxis,
  showGridLines = true,
  useGradient = false,
  legend,
  tooltip,
  animation = { enabled: true, duration: 750, easing: 'easeOut' },
  accessibility,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
  backgroundColor = 'transparent',
  showBorder = false,
  borderColor,
  borderWidth,
  borderRadius,
  className = "",
  style,
  onClick,
  onDataPointClick,
  onSeriesToggle,
  onRenderComplete,
  dataAttributes,
}) => {
  // State for tooltip
  const [tooltipData, setTooltipData] = useState<{
    visible: boolean;
    x: number;
    y: number;
    dataPoint?: ChartDataPoint;
    series?: ChartSeries<ChartDataPoint>;
    content?: React.ReactNode;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });

  // Process data into a standardized format
  const { series, maxValue } = useMemo(() => 
    processLineChartData(data), [data]
  );
  
  // Format values with default formatter
  const formatValue = (value: number): string => {
    if (typeof value !== 'number') return '';
    
    // Format large numbers
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    
    return value.toString();
  };

  // Handle point click
  const handlePointClick = (dataPoint: ChartDataPoint, index: number, seriesItem: ChartSeries<ChartDataPoint>) => {
    if (onDataPointClick) {
      onDataPointClick(dataPoint, index, seriesItem);
    }
  };
  
  // Handle mouse enter for tooltip
  const handlePointMouseEnter = (
    event: React.MouseEvent, 
    dataPoint: ChartDataPoint, 
    seriesItem: ChartSeries<ChartDataPoint>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setTooltipData({
      visible: true,
      x,
      y,
      dataPoint,
      series: seriesItem,
      content: (
        <div>
          <h4>{dataPoint.label}</h4>
          <p>{seriesItem.name}: {formatValue(dataPoint.value)}</p>
        </div>
      ),
    });
  };
  
  // Handle mouse leave for tooltip
  const handlePointMouseLeave = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  // Handle series toggle in legend
  const handleSeriesToggle = (seriesId: string, visible: boolean) => {
    if (onSeriesToggle) {
      onSeriesToggle(seriesId, visible);
    }
  };

  // Render the chart content with animation
  const renderChart = (width: number, height: number) => {
    if (width <= 0 || height <= 0) return null;
    
    const primarySeries = series[0];
    
    if (!primarySeries || primarySeries.data.length === 0) {
      return <LineChartNoData width={width} height={height} />;
    }
    
    // Determine if animation is enabled
    const animationEnabled = animation?.enabled !== false;
    const animationDuration = animation?.duration || 750;
    const animationEasing = animation?.easing || 'easeOut';
    
    const renderChartContent = (animatedSeries: ChartSeries<ChartDataPoint>[]) => (
      <>
        {/* Axes and grid lines */}
        <LineChartAxes
          series={animatedSeries}
          width={width}
          height={height}
          maxValue={maxValue}
          xAxis={xAxis as ChartAxis}
          yAxis={yAxis as ChartAxis}
          showGridLines={showGridLines}
          gridLineCount={5}
        />
        
        {/* Lines */}
        <LineChartLines
          series={animatedSeries}
          width={width}
          height={height}
          maxValue={maxValue}
          showArea={showArea}
          curved={curved}
          lineWidth={lineWidth}
          useGradient={useGradient}
          colors={defaultColors}
        />
        
        {/* Points */}
        {showPoints && (
          <LineChartPoints
            series={animatedSeries}
            width={width}
            height={height}
            maxValue={maxValue}
            pointRadius={pointRadius}
            colors={defaultColors}
            onPointClick={handlePointClick}
            onPointMouseEnter={handlePointMouseEnter}
            onPointMouseLeave={handlePointMouseLeave}
          />
        )}
      </>
    );
    
    // Wrap with animation if enabled
    if (animationEnabled) {
  return (
        <LineChartAnimation
          series={series}
          width={width}
          height={height}
          maxValue={maxValue}
          duration={animationDuration}
          easing={animationEasing as 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'}
          enabled={animationEnabled}
        >
          {renderChartContent}
        </LineChartAnimation>
      );
    }
      
    // No animation
    return renderChartContent(series);
};

  // Render the component
  return (
    <LineChartContainer
      width={width}
      height={height}
      showBorder={showBorder}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      className={className}
      style={style}
      dataAttributes={dataAttributes}
    >
      {/* Chart header */}
      <LineChartHeader title={title} subtitle={subtitle} />
      
      {/* Chart canvas */}
      <LineChartCanvas
        width={width}
        height={height}
        margin={margin}
        backgroundColor={backgroundColor}
      >
        {renderChart}
      </LineChartCanvas>
      
      {/* Legend */}
      {series.length > 1 && (
        <LineChartLegend
          series={series}
          colors={defaultColors}
          position={legend?.position || 'bottom'}
          layout={legend?.layout || 'horizontal'}
          interactive={legend?.interactive !== false}
          maxItems={legend?.maxItems}
          onSeriesToggle={handleSeriesToggle}
        />
      )}
      
      {/* Tooltip */}
      <LineChartTooltip
        visible={tooltipData.visible}
        x={tooltipData.x}
        y={tooltipData.y}
        dataPoint={tooltipData.dataPoint}
        series={tooltipData.series}
        customContent={tooltipData.content}
        formatValue={formatValue}
      />
    </LineChartContainer>
  );
};

export default LineChart;