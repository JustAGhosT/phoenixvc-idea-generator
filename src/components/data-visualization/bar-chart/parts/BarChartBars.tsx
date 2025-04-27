import React from 'react';
import { Bar } from '../../core';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import styles from '../BarChart.module.css';

interface BarChartBarsProps {
  /** Series data to display */
  series: ChartSeries<ChartDataPoint>[];
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Maximum value for scaling */
  maxValue: number;
  /** Chart orientation */
  orientation: 'horizontal' | 'vertical';
  /** Whether bars are stacked */
  stacked?: boolean;
  /** Whether bars are grouped */
  grouped?: boolean;
  /** Maximum width of bars */
  maxBarWidth?: number;
  /** Gap between bars as a fraction */
  barGap?: number;
  /** Corner radius of bars */
  barRadius?: number;
  /** Whether to use gradient fills */
  useGradient?: boolean;
  /** Array of colors for series */
  colors: string[];
  /** Callback when a bar is clicked */
  onBarClick?: (dataPoint: ChartDataPoint, index: number, series: ChartSeries<ChartDataPoint>) => void;
  /** Callback when mouse enters a bar */
  onBarMouseEnter?: (event: React.MouseEvent, dataPoint: ChartDataPoint, series: ChartSeries<ChartDataPoint>) => void;
  /** Callback when mouse leaves a bar */
  onBarMouseLeave?: () => void;
}

/**
 * BarChartBars component for rendering the bars in a bar chart
 */
const BarChartBars: React.FC<BarChartBarsProps> = ({
  series,
  width,
  height,
  maxValue,
  orientation,
  stacked = false,
  grouped = false,
  maxBarWidth,
  barGap = 0.2,
  barRadius = 4,
  useGradient = false,
  colors,
  onBarClick,
  onBarMouseEnter,
  onBarMouseLeave,
}) => {
  if (!series || series.length === 0 || !series[0].data.length) {
    return null;
  }

  const isVertical = orientation === 'vertical';
  const primarySeries = series[0];
  const dataCount = primarySeries.data.length;
  const seriesCount = series.length;

  // Calculate bar dimensions
  const barWidth = isVertical 
    ? (width / dataCount) * (1 - barGap)
    : (height / dataCount) * (1 - barGap);
  
  // Apply max bar width if specified
  const actualBarWidth = maxBarWidth 
    ? Math.min(barWidth, maxBarWidth) 
    : barWidth;

  // Render simple bars (single series)
  if (series.length === 1 && !stacked && !grouped) {
    return (
      <g className={styles.barsContainer}>
        {primarySeries.data.map((item, index) => {
          const value = item.value || 0;
          const barProps = isVertical 
            ? {
                x: index * (width / dataCount) + (width / dataCount - actualBarWidth) / 2,
                y: height - (value / maxValue) * height,
                width: actualBarWidth,
                height: (value / maxValue) * height,
              }
            : {
                x: 0,
                y: index * (height / dataCount) + (height / dataCount - actualBarWidth) / 2,
                width: (value / maxValue) * width,
                height: actualBarWidth,
              };
          
          return (
            <Bar
              key={`bar-${index}`}
              {...barProps}
              fill={colors[0]}
              radius={barRadius}
              useGradient={useGradient}
              onClick={(e) => onBarClick?.(item, index, primarySeries)}
              onMouseEnter={(e) => onBarMouseEnter?.(e, item, primarySeries)}
              onMouseLeave={onBarMouseLeave}
              dataAttributes={{
                label: item.label,
                value: String(item.value),
              }}
            />
          );
        })}
      </g>
    );
  }

  // Render stacked bars
  if (stacked && series.length > 1) {
    return (
      <g className={styles.barsContainer}>
        {primarySeries.data.map((_, dataIndex) => {
          // Calculate stacked values
          let stackedValues: { 
            series: ChartSeries<ChartDataPoint>; 
            dataPoint: ChartDataPoint; 
            startValue: number; 
            endValue: number;
          }[] = [];
          
          let currentStackValue = 0;
          
          series.forEach((seriesItem, seriesIndex) => {
            const dataPoint = seriesItem.data[dataIndex];
            if (!dataPoint) return;
            
            const startValue = currentStackValue;
            currentStackValue += dataPoint.value || 0;
            
            stackedValues.push({
              series: seriesItem,
              dataPoint,
              startValue,
              endValue: currentStackValue,
            });
          });
          
          // Render stacked bars for this data point
          return (
            <g key={`stack-${dataIndex}`}>
              {stackedValues.map((stack, stackIndex) => {
                const startHeight = (stack.startValue / maxValue) * (isVertical ? height : width);
                const endHeight = (stack.endValue / maxValue) * (isVertical ? height : width);
                const barHeight = endHeight - startHeight;
                
                const barProps = isVertical 
                  ? {
                      x: dataIndex * (width / dataCount) + (width / dataCount - actualBarWidth) / 2,
                      y: height - endHeight,
                      width: actualBarWidth,
                      height: barHeight,
                    }
                  : {
                      x: startHeight,
                      y: dataIndex * (height / dataCount) + (height / dataCount - actualBarWidth) / 2,
                      width: barHeight,
                      height: actualBarWidth,
                    };
                
                return (
                  <Bar
                    key={`stack-${dataIndex}-${stackIndex}`}
                    {...barProps}
                    fill={colors[stackIndex % colors.length]}
                    radius={stackIndex === stackedValues.length - 1 ? barRadius : 0}
                    useGradient={useGradient}
                    onClick={(e) => onBarClick?.(stack.dataPoint, dataIndex, stack.series)}
                    onMouseEnter={(e) => onBarMouseEnter?.(e, stack.dataPoint, stack.series)}
                    onMouseLeave={onBarMouseLeave}
                    dataAttributes={{
                      label: stack.dataPoint.label,
                      value: String(stack.dataPoint.value),
                      series: stack.series.name,
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    );
  }

  // Render grouped bars
  if (grouped && series.length > 1) {
    const groupWidth = isVertical 
      ? width / dataCount
      : height / dataCount;
    
    const individualBarWidth = (groupWidth * (1 - barGap)) / seriesCount;
    const actualIndividualBarWidth = maxBarWidth 
      ? Math.min(individualBarWidth, maxBarWidth) 
      : individualBarWidth;
    
    return (
      <g className={styles.barsContainer}>
        {primarySeries.data.map((_, dataIndex) => (
          <g key={`group-${dataIndex}`}>
            {series.map((seriesItem, seriesIndex) => {
              const dataPoint = seriesItem.data[dataIndex];
              if (!dataPoint) return null;
              
              const value = dataPoint.value || 0;
              
              const barProps = isVertical 
                ? {
                    x: dataIndex * groupWidth + seriesIndex * individualBarWidth + (groupWidth - seriesCount * individualBarWidth) / 2,
                    y: height - (value / maxValue) * height,
                    width: actualIndividualBarWidth,
                    height: (value / maxValue) * height,
                  }
                : {
                    x: 0,
                    y: dataIndex * groupWidth + seriesIndex * individualBarWidth + (groupWidth - seriesCount * individualBarWidth) / 2,
                    width: (value / maxValue) * width,
                    height: actualIndividualBarWidth,
                  };
              
              return (
                <Bar
                  key={`group-${dataIndex}-${seriesIndex}`}
                  {...barProps}
                  fill={colors[seriesIndex % colors.length]}
                  radius={barRadius}
                  useGradient={useGradient}
                  onClick={(e) => onBarClick?.(dataPoint, dataIndex, seriesItem)}
                  onMouseEnter={(e) => onBarMouseEnter?.(e, dataPoint, seriesItem)}
                  onMouseLeave={onBarMouseLeave}
                  dataAttributes={{
                    label: dataPoint.label,
                    value: String(dataPoint.value),
                    series: seriesItem.name,
                  }}
                />
              );
            })}
          </g>
        ))}
      </g>
    );
  }

  return null;
};

export default BarChartBars;