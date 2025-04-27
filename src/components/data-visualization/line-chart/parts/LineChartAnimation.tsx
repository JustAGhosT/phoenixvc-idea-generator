import React, { useEffect, useRef, useState } from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';

export interface LineChartAnimationProps {
  /** Series data to animate */
  series: ChartSeries<ChartDataPoint>[];
  /** Width of the chart area */
  width: number;
  /** Height of the chart area */
  height: number;
  /** Maximum value for scaling */
  maxValue: number;
  /** Animation duration in ms */
  duration?: number;
  /** Animation delay in ms */
  delay?: number;
  /** Animation easing function */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  /** Whether animation is enabled */
  enabled?: boolean;
  /** Render function that receives animated series */
  children: (animatedSeries: ChartSeries<ChartDataPoint>[]) => React.ReactNode;
}

/**
 * LineChartAnimation component for animating line chart elements
 */
export const LineChartAnimation: React.FC<LineChartAnimationProps> = ({
  series,
  width,
  height,
  maxValue,
  duration = 750,
  delay = 0,
  easing = 'easeOut',
  enabled = true,
  children,
}) => {
  // Store original series for comparison
  const originalSeriesRef = useRef<ChartSeries<ChartDataPoint>[]>([]);
  
  // State for animated series
  const [animatedSeries, setAnimatedSeries] = useState<ChartSeries<ChartDataPoint>[]>(
    enabled ? 
      series.map(s => ({
        ...s,
        data: s.data.map(d => ({ ...d, value: 0 }))
      })) : 
      series
  );
  
  // Animation frame reference
  const animationRef = useRef<number | null>(null);
  
  // Animation start time reference
  const startTimeRef = useRef<number | null>(null);
  
  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  };
  
  // Animation function
  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(1, Math.max(0, (elapsed - delay) / duration));
    const easedProgress = easingFunctions[easing](progress);
    
    // Update animated series with interpolated values
    const newAnimatedSeries = series.map((s, seriesIndex) => {
      const originalSeries = originalSeriesRef.current[seriesIndex] || { data: [] };
      
      return {
        ...s,
        data: s.data.map((d, dataIndex) => {
          const originalValue = originalSeries.data[dataIndex]?.value || 0;
          const targetValue = d.value;
          const animatedValue = originalValue + (targetValue - originalValue) * easedProgress;
          
          return {
            ...d,
            value: animatedValue,
          };
        }),
      };
    });
    
    setAnimatedSeries(newAnimatedSeries);
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Ensure final state matches target exactly
      setAnimatedSeries(series);
    }
  };
  
  // Start animation when series changes
  useEffect(() => {
    if (!enabled) {
      setAnimatedSeries(series);
      return;
    }
    
    // Store current animated series as original for interpolation
    originalSeriesRef.current = animatedSeries;
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [series, enabled]);
  
  return <>{children(animatedSeries)}</>;
};

export default LineChartAnimation;