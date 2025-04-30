import React, { memo, useMemo } from 'react';
import { ChartAnimation } from '../../types/chart-config';
import styles from '../PieChart.module.css';
import animationStyles from '../PieChartAnimations.module.css';
import { useSliceAnimation } from '../hooks/useSliceAnimation';
import { PieChartData } from './PieChartUtils';

interface PieChartSlicesProps {
  data: PieChartData[];
  size: number;
  donut: boolean;
  innerRadius: number;
  showDataLabels: boolean;
  showPercentage: boolean;
  animation: ChartAnimation;
  hoveredSlice: number | null;
  selectedSlice: number | null;
  onHover: (index: number | null) => void;
  onSelect: (slice: PieChartData, index: number) => void;
}

// Using React.memo to prevent unnecessary re-renders
export const PieChartSlices: React.FC<PieChartSlicesProps> = memo(({
  data,
  size,
  donut,
  innerRadius,
  showDataLabels,
  showPercentage,
  animation,
  hoveredSlice,
  selectedSlice,
  onHover,
  onSelect,
}) => {
  // Calculate dimensions
  const radius = useMemo(() => size / 2, [size]);
  const center = useMemo(() => size / 2, [size]);
  const actualInnerRadius = useMemo(
    () => donut ? (radius * innerRadius) / 100 : 0, 
    [donut, radius, innerRadius]
  );
  
  // Use our custom animation hook
  const { setSliceRef, setLabelRef } = useSliceAnimation({
    data,
    animation,
    size,
    donut,
    innerRadius,
    showDataLabels
  });
  
  // Generate pie slices
  return (
    <g>
      {data.map((slice, index) => {
        if (slice.visible === false) return null;
        
        // Calculate initial path
        const startX = center + radius * Math.cos((slice.startAngle * Math.PI) / 180);
        const startY = center + radius * Math.sin((slice.startAngle * Math.PI) / 180);
        
        const endX = center + radius * Math.cos(((slice.startAngle + slice.angle) * Math.PI) / 180);
        const endY = center + radius * Math.sin(((slice.startAngle + slice.angle) * Math.PI) / 180);
        
        const largeArcFlag = slice.angle > 180 ? 1 : 0;
        
        let path = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
        
        if (donut) {
          const innerStartX = center + actualInnerRadius * Math.cos((slice.startAngle * Math.PI) / 180);
          const innerStartY = center + actualInnerRadius * Math.sin((slice.startAngle * Math.PI) / 180);
          
          const innerEndX = center + actualInnerRadius * Math.cos(((slice.startAngle + slice.angle) * Math.PI) / 180);
          const innerEndY = center + actualInnerRadius * Math.sin(((slice.startAngle + slice.angle) * Math.PI) / 180);
          
          path += ` L ${innerEndX} ${innerEndY} A ${actualInnerRadius} ${actualInnerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY} Z`;
        } else {
          path += ` L ${center} ${center} Z`;
        }
        
        // Calculate label position
        const midAngle = slice.startAngle + (slice.angle / 2);
        const labelRadius = actualInnerRadius + (radius - actualInnerRadius) / 2;
        
        const labelX = center + labelRadius * Math.cos((midAngle * Math.PI) / 180);
        const labelY = center + labelRadius * Math.sin((midAngle * Math.PI) / 180);
        
        // Determine if this slice is hovered or selected
        const isHovered = hoveredSlice === index;
        const isSelected = selectedSlice === index;
        
        // Slice class with conditional selection class
        const sliceClassName = `${styles.pieChartSlice} ${isSelected ? styles.pieChartSliceSelected : ''} ${animation.enabled ? animationStyles.pieChartSliceAnimated : ''}`;
        
        // Prepare label text
        let labelText = slice.label;
        if (showPercentage && slice.percentage !== undefined) {
          labelText = showDataLabels && slice.label
            ? `${slice.label}: ${(slice.percentage * 100).toFixed(1)}%`
            : `${(slice.percentage * 100).toFixed(1)}%`;
        }
        
        return (
          <g key={`slice-${index}`}>
            <path
              ref={setSliceRef(index)}
              d={path}
              fill={slice.color}
              className={sliceClassName}
              style={{
                opacity: animation.enabled ? 0 : 1,
                transform: isSelected ? 'translate(5px, 5px)' : 'none',
                filter: isSelected ? 'drop-shadow(-3px -3px 5px rgba(0,0,0,0.2))' : 'none',
              }}
              onMouseEnter={() => onHover(index)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(slice, index)}
              aria-label={`${slice.label}: ${slice.value} (${slice.percentage !== undefined ? (slice.percentage * 100).toFixed(1) : 0}%)`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
            />
            
            {showDataLabels && (
              <text
                ref={setLabelRef(index)}
                x={labelX}
                y={labelY}
                dy=".35em"
                className={`${styles.pieChartSliceLabel} ${animation.enabled ? animationStyles.pieChartSliceLabel : ''}`}
                style={{
                  opacity: animation.enabled ? 0 : 1,
                  fill: isHovered ? '#fff' : '#fff',
                  fontWeight: isHovered ? 'bold' : 'normal',
                  fontSize: isHovered ? '13px' : '12px',
                  textShadow: '0px 0px 3px rgba(0,0,0,0.5)',
                }}
              >
                {labelText}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
});

// Display name for debugging
PieChartSlices.displayName = 'PieChartSlices';