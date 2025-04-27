import React, { useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipPosition {
  x: number;
  y: number;
}

export interface TooltipContainerProps {
  /** Whether the tooltip is visible */
  visible: boolean;
  /** X position of the tooltip (relative to chart) */
  x: number;
  /** Y position of the tooltip (relative to chart) */
  y: number;
  /** Content of the tooltip */
  children: React.ReactNode;
  /** Position strategy */
  position?: 'pointer' | 'element' | 'fixed';
  /** Offset from the pointer or element */
  offset?: { x: number; y: number };
  /** Additional CSS class */
  className?: string;
}

/**
 * TooltipContainer component that handles positioning and visibility
 */
export const TooltipContainer: React.FC<TooltipContainerProps> = ({
  visible,
  x,
  y,
  children,
  position = 'pointer',
  offset = { x: 10, y: 10 },
  className = '',
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update tooltip position and dimensions
  useEffect(() => {
    if (!visible || !tooltipRef.current) return;

    // Get tooltip dimensions
    const { width, height } = tooltipRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    // Calculate position based on strategy
    let posX = x + offset.x;
    let posY = y + offset.y;

    // Adjust position to keep tooltip within viewport
    const parentRect = tooltipRef.current.parentElement?.getBoundingClientRect();
    if (parentRect) {
      if (posX + width > parentRect.width) {
        posX = x - width - offset.x;
      }
      if (posY + height > parentRect.height) {
        posY = y - height - offset.y;
      }
    }

    setTooltipPosition({ x: posX, y: posY });
  }, [visible, x, y, offset, position]);

  if (!visible) return null;

  return (
    <div
      ref={tooltipRef}
      className={`${styles.tooltip} ${className}`}
      style={{
        transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default TooltipContainer;