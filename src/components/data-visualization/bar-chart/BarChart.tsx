import React, { useMemo, useState } from 'react';
import { BarChartProps } from '../types/bar-chart-types';
import { ChartDataPoint, ChartSeries } from '../types/base-types';
import { ChartAxis } from '../types/index'; // Import from index to ensure consistency
import {
  BarChartAxes,
  BarChartBars,
  BarChartCanvas,
  BarChartContainer,
  BarChartHeader,
  BarChartNoData,
  BarChartTooltip,
} from './parts';
import { defaultColors, processBarChartData } from './parts/BarChartUtils';
/**
 * BarChart component for displaying data as horizontal or vertical bars.
 * 
 * @example
 * ```tsx
 * <BarChart
 *   title="Top Projects"
 *   data={[
 *     { label: 'Project A', value: 85 },
 *     { label: 'Project B', value: 65 }
 *   ]}
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  subtitle,
  width = "100%",
  height = 300,
  orientation = "vertical",
  stacked = false,
  grouped = false,
  maxBarWidth,
  barRadius = 4,
  barGap = 0.2,
  showDataLabels = false,
  xAxis,
  yAxis,
  showBaseline = true,
  useGradient = false,
  legend,
  tooltip,
  animation,
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
    processBarChartData(data), [data]
  );
  
  // Format values with default formatter
  const formatValue = (value: number): string => {
    if (typeof value !== 'number') return '';
    return value.toString();
  };

  // Handle bar click
  const handleBarClick = (dataPoint: ChartDataPoint, index: number, seriesItem: ChartSeries<ChartDataPoint>) => {
    if (onDataPointClick) {
      onDataPointClick(dataPoint, index, seriesItem);
    }
  };
  
  // Handle mouse enter for tooltip
  const handleBarMouseEnter = (
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
  const handleBarMouseLeave = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  // Render the chart content
  const renderChart = (width: number, height: number) => {
    if (width <= 0 || height <= 0) return null;
    
    const primarySeries = series[0];
    
    if (!primarySeries || primarySeries.data.length === 0) {
      return <BarChartNoData width={width} height={height} />;
    }
    
    return (
      <>
        {/* Axes and grid lines */}
        <BarChartAxes
          series={series}
          width={width}
          height={height}
          maxValue={maxValue}
          orientation={orientation}
          xAxis={xAxis as ChartAxis}
          yAxis={yAxis as ChartAxis}
          showGridLines={true}
          gridLineCount={5}
        />
        
        {/* Bars */}
        <BarChartBars
          series={series}
          width={width}
          height={height}
          maxValue={maxValue}
          orientation={orientation}
          stacked={stacked}
          grouped={grouped}
          maxBarWidth={maxBarWidth}
          barGap={barGap}
          barRadius={barRadius}
          useGradient={useGradient}
          colors={defaultColors}
          onBarClick={handleBarClick}
          onBarMouseEnter={handleBarMouseEnter}
          onBarMouseLeave={handleBarMouseLeave}
        />
      </>
    );
  };
  
  // Render the component
  return (
    <BarChartContainer
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
      <BarChartHeader title={title} subtitle={subtitle} />
      
      {/* Chart canvas */}
      <BarChartCanvas
        width={width}
        height={height}
        margin={margin}
        backgroundColor={backgroundColor}
      >
        {renderChart}
      </BarChartCanvas>
      
      {/* Tooltip */}
      <BarChartTooltip
        visible={tooltipData.visible}
        x={tooltipData.x}
        y={tooltipData.y}
        dataPoint={tooltipData.dataPoint}
        series={tooltipData.series}
        customContent={tooltipData.content}
        formatValue={formatValue}
      />
    </BarChartContainer>
  );
};

export default BarChart;