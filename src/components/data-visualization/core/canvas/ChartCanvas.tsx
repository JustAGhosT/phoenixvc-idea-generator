import React, { useEffect, useRef, useState } from 'react';
import { ChartMargin } from '../../types';
import styles from './ChartCanvas.module.css';

export interface ChartCanvasProps {
  /** Width of the chart canvas */
  width?: number | string;
  /** Height of the chart canvas */
  height?: number | string;
  /** Margins around the chart content */
  margin?: ChartMargin;
  /** Background color */
  backgroundColor?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Chart content - can be either React nodes or a render function */
  children: React.ReactNode | ((width: number, height: number) => React.ReactNode);
  /** Callback when canvas size changes */
  onSizeChange?: (width: number, height: number) => void;
}

/**
 * ChartCanvas component provides the base container for all chart types
 * with proper sizing and margins.
 */
export const ChartCanvas: React.FC<ChartCanvasProps> = ({
  width = '100%',
  height = 300,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  backgroundColor = 'transparent',
  className = '',
  style = {},
  children,
  onSizeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate inner dimensions (content area)
  const innerWidth = typeof dimensions.width === 'number' 
    ? dimensions.width - (margin.left || 0) - (margin.right || 0) 
    : 0;
    
  const innerHeight = typeof dimensions.height === 'number' 
    ? dimensions.height - (margin.top || 0) - (margin.bottom || 0) 
    : 0;

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      
      if (onSizeChange) {
        onSizeChange(width, height);
      }
    };

    // Initial measurement
    updateDimensions();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [onSizeChange]);

  // Render content based on type - handle both ReactNode and function children
  const renderContent = () => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return null;
    
    if (typeof children === 'function') {
      return children(innerWidth, innerHeight);
    }
    
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          width: innerWidth,
          height: innerHeight,
        });
      }
      return child;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.chartCanvasContainer} ${className}`}
      style={{
        width,
        height,
        backgroundColor,
        ...style,
      }}
    >
      <svg className={styles.chartCanvasSvg} width={dimensions.width} height={dimensions.height}>
        {/* Chart background */}
        <rect
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          fill={backgroundColor}
          rx={4}
          ry={4}
        />
        
        {/* Content group with margins applied */}
        <g
          transform={`translate(${margin.left || 0}, ${margin.top || 0})`}
          className={styles.chartCanvasContentGroup}
        >
          {/* Render children with dimensions */}
          {renderContent()}
        </g>
      </svg>
    </div>
  );
};

export default ChartCanvas;