import React from 'react';
import styles from './DataPointIndicator.module.css';

interface DataPointIndicatorProps {
  /** X position of the data point */
  x: number;
  /** Y position of the data point */
  y: number;
  /** Indicator type */
  type?: 'circle' | 'square' | 'diamond' | 'cross' | 'star';
  /** Indicator size */
  size?: number;
  /** Indicator color */
  color?: string;
  /** Whether to pulse/animate the indicator */
  pulse?: boolean;
  /** Whether to show a crosshair */
  showCrosshair?: boolean;
  /** Crosshair width */
  crosshairWidth?: number;
  /** Crosshair height */
  crosshairHeight?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * DataPointIndicator component for highlighting specific data points
 */
export const DataPointIndicator: React.FC<DataPointIndicatorProps> = ({
  x,
  y,
  type = 'circle',
  size = 8,
  color = 'var(--color-primary, #3b82f6)',
  pulse = false,
  showCrosshair = false,
  crosshairWidth,
  crosshairHeight,
  className = '',
}) => {
  // Render different shapes based on type
  const renderIndicator = () => {
    switch (type) {
      case 'square':
        return (
          <rect
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            fill={color}
            className={pulse ? styles.pulse : ''}
          />
        );
        
      case 'diamond':
        return (
          <polygon
            points={`${x},${y-size/2} ${x+size/2},${y} ${x},${y+size/2} ${x-size/2},${y}`}
            fill={color}
            className={pulse ? styles.pulse : ''}
          />
        );
        
      case 'cross':
        return (
          <g className={pulse ? styles.pulse : ''}>
            <line
              x1={x - size / 2}
              y1={y - size / 2}
              x2={x + size / 2}
              y2={y + size / 2}
              stroke={color}
              strokeWidth={2}
            />
            <line
              x1={x - size / 2}
              y1={y + size / 2}
              x2={x + size / 2}
              y2={y - size / 2}
              stroke={color}
              strokeWidth={2}
            />
          </g>
        );
        
      case 'star':
        const points = [];
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const outerX = x + Math.cos(angle) * size / 2;
          const outerY = y + Math.sin(angle) * size / 2;
          points.push(`${outerX},${outerY}`);
          
          const innerAngle = angle + Math.PI / 5;
          const innerX = x + Math.cos(innerAngle) * size / 4;
          const innerY = y + Math.sin(innerAngle) * size / 4;
          points.push(`${innerX},${innerY}`);
        }
        
        return (
          <polygon
            points={points.join(' ')}
            fill={color}
            className={pulse ? styles.pulse : ''}
          />
        );
        
      case 'circle':
      default:
        return (
          <circle
            cx={x}
            cy={y}
            r={size / 2}
            fill={color}
            className={pulse ? styles.pulse : ''}
          />
        );
    }
  };
  
  return (
    <g className={`${styles.indicator} ${className}`}>
      {/* Crosshair */}
      {showCrosshair && (
        <>
          <line
            x1={x}
            y1={y - (crosshairHeight || size * 4)}
            x2={x}
            y2={y + (crosshairHeight || size * 4)}
            stroke={color}
            strokeWidth={1}
            strokeDasharray="2,2"
            opacity={0.5}
          />
          <line
            x1={x - (crosshairWidth || size * 4)}
            y1={y}
            x2={x + (crosshairWidth || size * 4)}
            y2={y}
            stroke={color}
            strokeWidth={1}
            strokeDasharray="2,2"
            opacity={0.5}
          />
        </>
      )}
      
      {/* Indicator */}
      {renderIndicator()}
    </g>
  );
};

export default DataPointIndicator;