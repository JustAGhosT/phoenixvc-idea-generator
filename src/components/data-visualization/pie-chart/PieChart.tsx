import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '../../../hooks/use-debounce';
import { PieChartProps } from '../types/pie-chart-types';
import styles from './PieChart.module.css';
import animationStyles from './PieChartAnimation.module.css';
import { calculatePieData, PieChartContainer, PieChartHeader, PieChartLegend, PieChartNoData, PieChartSlices, PieChartTooltip } from './parts';
import { PieChartData } from './parts/PieChartUtils';

/**
 * PieChart Component
 * 
 * A versatile and interactive pie chart component for displaying proportional data.
 * Supports donut charts, data labels, animations, and interactive features.
 */
export const PieChart: React.FC<PieChartProps> = ({
  // Data props
  data = [],
  
  // Dimension props
  width = '100%',
  height = 300,
  
  // Content props
  title,
  subtitle,
  description,
  
  // Styling props
  backgroundColor = 'transparent',
  showBorder = false,
  borderColor,
  borderWidth = 1,
  borderRadius = 0,
  className = '',
  style,
  
  // Margin props
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  
  // Pie specific props
  donut = false,
  innerRadius = 50,
  showDataLabels = false,
  showPercentage = true,
  startAngle = 0,
  endAngle = 360,
  padAngle = 0,
  sortSlices = true,
  selectable = false,
  selectedSlice,
  
  // Legend props
  legend = { position: 'bottom', layout: 'horizontal', interactive: true },
  
  // Tooltip props
  tooltip = {},
  
  // Animation props
  animation = { enabled: true, duration: 750, easing: 'easeOut' },
  
  // Accessibility props
  accessibility,
  
  // State props
  loading = false,
  error,
  
  // Event handlers
  onClick,
  onDataPointClick,
  onSeriesToggle,
  onRenderComplete,
  onSliceSelect,
  
  // Other props
  dataAttributes,
}) => {
  // State for hover and selection
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [selectedSliceIndex, setSelectedSliceIndex] = useState<number | null>(
    selectedSlice !== undefined ? selectedSlice : null
  );

  // Use debounced hover state to prevent flickering
  const debouncedHoveredSlice = useDebounce(hoveredSlice, 50);

  // Ensure all margin properties have default values
  const safeMargin = useMemo(() => ({
    top: margin?.top ?? 20,
    right: margin?.right ?? 20,
    bottom: margin?.bottom ?? 20,
    left: margin?.left ?? 20
  }), [margin]);

  // Calculate pie data with percentages and angles
  const pieData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return calculatePieData(data, { 
      sortSlices, 
      startAngle, 
      endAngle,
      padAngle
    });
  }, [data, sortSlices, startAngle, endAngle, padAngle]);

  // Validate props
  const validatedInnerRadius = useMemo(() => {
    return Math.max(0, Math.min(100, innerRadius));
  }, [innerRadius]);

  // Handle slice hover with debouncing
  const handleSliceHover = useCallback((index: number | null) => {
    setHoveredSlice(index);
  }, []);

  // Handle slice selection with proper typing
  const handleSliceSelect = useCallback((slice: PieChartData, index: number) => {
    if (!selectable) return;
    
    const newIndex = selectedSliceIndex === index ? null : index;
    setSelectedSliceIndex(newIndex);
    
    if (onSliceSelect) {
      onSliceSelect(slice, index);
    }
    
    if (onDataPointClick) {
      onDataPointClick(slice, index);
    }
  }, [selectable, selectedSliceIndex, onSliceSelect, onDataPointClick]);

  // Handle legend item toggle
  const handleLegendToggle = useCallback((id: string, visible: boolean) => {
    if (onSeriesToggle) {
      onSeriesToggle(id, visible);
    }
  }, [onSeriesToggle]);

  // Call onRenderComplete when chart is fully rendered
  React.useEffect(() => {
    if (pieData.length > 0 && onRenderComplete) {
      onRenderComplete();
    }
  }, [pieData, onRenderComplete]);

  // Render loading state
  if (loading) {
    return (
      <PieChartContainer
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        showBorder={showBorder}
        borderColor={borderColor}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        className={`${className} ${animationStyles.loading}`}
        style={style}
        dataAttributes={dataAttributes}
      >
        <div className={styles.pieChartLoading}>Loading chart data...</div>
      </PieChartContainer>
    );
  }

  // Render error state
  if (error) {
    return (
      <PieChartContainer
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        showBorder={showBorder}
        borderColor={borderColor}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        className={`${className} ${animationStyles.error}`}
        style={style}
        dataAttributes={dataAttributes}
      >
        <div className={styles.pieChartError}>{error}</div>
      </PieChartContainer>
    );
  }

  // Render no data state
  if (!data || data.length === 0 || pieData.length === 0) {
    return (
      <PieChartContainer
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        showBorder={showBorder}
        borderColor={borderColor}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        className={className}
        style={style}
        dataAttributes={dataAttributes}
      >
        <PieChartNoData />
      </PieChartContainer>
    );
  }

  // Calculate dimensions based on legend position using safe margin values
  const chartSize = useMemo(() => {
    return Math.min(
      typeof height === 'number'
        ? height - safeMargin.top - safeMargin.bottom
        : 300 - safeMargin.top - safeMargin.bottom, // Default if height is percentage
      typeof width === 'number' 
        ? width - safeMargin.left - safeMargin.right 
        : 300 // Default if width is percentage
    );
  }, [height, width, safeMargin]);

  // Ensure legend properties have default values
  const legendPosition = legend?.position || 'bottom';
  const legendLayout = legend?.layout || 'horizontal';
  const legendInteractive = legend?.interactive ?? true;

  // Get reference element for tooltip positioning
  const tooltipReferenceElement = debouncedHoveredSlice !== null && pieData[debouncedHoveredSlice] 
    ? document.getElementById(`slice-${debouncedHoveredSlice}`) 
    : null;

  return (
    <PieChartContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      showBorder={showBorder}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      className={`${className} ${animation.enabled ? animationStyles.chartContent : ''}`}
      style={style}
      dataAttributes={dataAttributes}
      onClick={onClick}
      accessibility={accessibility}
    >
      {/* Chart header with title and subtitle */}
      {(title || subtitle) && (
        <PieChartHeader 
          title={title} 
          subtitle={subtitle} 
        />
      )}
      
      <div className={styles.pieChartChartContent}>
        {/* Legend (if position is top or left) */}
        {legend && (legendPosition === 'top' || legendPosition === 'left') && (
          <PieChartLegend
            data={pieData}
            position={legendPosition}
            layout={legendLayout}
            interactive={legendInteractive}
            onToggle={handleLegendToggle}
          />
        )}
        
        {/* SVG Chart Area */}
        <svg
          width={chartSize}
          height={chartSize}
          viewBox={`0 0 ${chartSize} ${chartSize}`}
          className={`${styles.pieChartChartSvg} ${animation.enabled ? animationStyles.chartSvg : ''}`}
          role="img"
          aria-label={description || title || 'Pie Chart'}
        >
          <PieChartSlices
            data={pieData}
            size={chartSize}
            donut={donut}
            innerRadius={validatedInnerRadius}
            showDataLabels={showDataLabels}
            showPercentage={showPercentage}
            animation={animation}
            hoveredSlice={debouncedHoveredSlice}
            selectedSlice={selectedSliceIndex}
            onHover={handleSliceHover}
            onSelect={handleSliceSelect}
          />
        </svg>
        
        {/* Legend (if position is bottom or right) */}
        {legend && (legendPosition === 'bottom' || legendPosition === 'right') && (
          <PieChartLegend
            data={pieData}
            position={legendPosition}
            layout={legendLayout}
            interactive={legendInteractive}
            onToggle={handleLegendToggle}
          />
        )}
      </div>
      
      {/* Tooltip */}
      {tooltip && debouncedHoveredSlice !== null && pieData[debouncedHoveredSlice] && (
        <PieChartTooltip
          data={pieData[debouncedHoveredSlice]}
          formatter={tooltip.formatter}
          referenceElement={tooltipReferenceElement}
        />
      )}
    </PieChartContainer>
  );
};

export default PieChart;