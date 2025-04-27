import { useEffect, useRef } from 'react';
import { ChartAnimation } from '../../types/chart-config';
import { PieChartData } from './PieChartUtils';

interface UseSliceAnimationProps {
  data: PieChartData[];
  animation: ChartAnimation;
  size: number;
  donut: boolean;
  innerRadius: number;
  showDataLabels: boolean;
}

/**
 * Custom hook for handling pie chart slice animations
 */
export const useSliceAnimation = ({
  data,
  animation,
  size,
  donut,
  innerRadius,
  showDataLabels
}: UseSliceAnimationProps) => {
  const animationRef = useRef<number | null>(null);
  const sliceRefs = useRef<SVGPathElement[]>([]);
  const labelRefs = useRef<SVGTextElement[]>([]);
  
  // Setup slice and label refs
  const setSliceRef = (index: number) => (el: SVGPathElement | null) => {
    if (el) {
      sliceRefs.current[index] = el;
    }
  };
  
  const setLabelRef = (index: number) => (el: SVGTextElement | null) => {
    if (el) {
      labelRefs.current[index] = el;
    }
  };
  
  // Animation effect
  useEffect(() => {
    // Skip animation if disabled
    if (!animation.enabled) return;
    
    // Calculate dimensions inside the effect to avoid dependency issues
    const radius = size / 2;
    const center = size / 2;
    const actualInnerRadius = donut ? (radius * innerRadius) / 100 : 0;
    
    let startTime: number | null = null;
    const duration = animation.duration || 750;
    
    // Initialize refs arrays
    sliceRefs.current = sliceRefs.current.slice(0, data.length);
    labelRefs.current = labelRefs.current.slice(0, data.length);
    
    // Animation frame function
    const animateFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing
      let easedProgress = progress;
      if (animation.easing === 'easeIn') {
        easedProgress = progress * progress;
      } else if (animation.easing === 'easeOut') {
        easedProgress = progress * (2 - progress);
      } else if (animation.easing === 'easeInOut') {
        easedProgress = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      }
      
      // Animate each slice
      data.forEach((slice, i) => {
        const sliceEl = sliceRefs.current[i];
        const labelEl = labelRefs.current[i];
        
        if (sliceEl) {
          // Animate slice
          const endAngle = slice.startAngle + slice.angle * easedProgress;
          const largeArcFlag = (endAngle - slice.startAngle) > 180 ? 1 : 0;
          
          const startX = center + radius * Math.cos((slice.startAngle * Math.PI) / 180);
          const startY = center + radius * Math.sin((slice.startAngle * Math.PI) / 180);
          
          const endX = center + radius * Math.cos((endAngle * Math.PI) / 180);
          const endY = center + radius * Math.sin((endAngle * Math.PI) / 180);
          
          const innerStartX = center + actualInnerRadius * Math.cos((slice.startAngle * Math.PI) / 180);
          const innerStartY = center + actualInnerRadius * Math.sin((slice.startAngle * Math.PI) / 180);
          
          const innerEndX = center + actualInnerRadius * Math.cos((endAngle * Math.PI) / 180);
          const innerEndY = center + actualInnerRadius * Math.sin((endAngle * Math.PI) / 180);
          
          let path = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
          
          if (donut) {
            path += ` L ${innerEndX} ${innerEndY} A ${actualInnerRadius} ${actualInnerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY} Z`;
          } else {
            path += ` L ${center} ${center} Z`;
          }
          
          sliceEl.setAttribute('d', path);
          sliceEl.style.opacity = `${easedProgress}`;
        }
        
        // Animate label
        if (labelEl && showDataLabels) {
          const midAngle = slice.startAngle + (slice.angle / 2);
          const labelRadius = actualInnerRadius + (radius - actualInnerRadius) / 2;
          
          const labelX = center + labelRadius * Math.cos((midAngle * Math.PI) / 180);
          const labelY = center + labelRadius * Math.sin((midAngle * Math.PI) / 180);
          
          labelEl.setAttribute('x', `${labelX}`);
          labelEl.setAttribute('y', `${labelY}`);
          labelEl.style.opacity = progress > 0.7 ? `${(progress - 0.7) * 3}` : '0';
        }
      });
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFrame);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateFrame);
    
    // Cleanup animation on unmount or when dependencies change
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [data, animation.enabled, animation.duration, animation.easing, size, donut, innerRadius, showDataLabels]);
  
  return {
    setSliceRef,
    setLabelRef
  };
};