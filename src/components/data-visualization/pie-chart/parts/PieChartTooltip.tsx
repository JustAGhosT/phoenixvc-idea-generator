import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import styles from '../PieChart.module.css';
import { PieChartData } from './PieChartUtils';

interface PieChartTooltipProps {
  data: PieChartData;
  formatter?: (data: PieChartData) => React.ReactNode;
  referenceElement?: Element | null;
}

export const PieChartTooltip: React.FC<PieChartTooltipProps> = ({
  data,
  formatter,
  referenceElement
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  
  // Use Popper.js for better positioning
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 8] } },
      { name: 'preventOverflow', options: { padding: 8 } }
    ],
    placement: 'auto',
    strategy: 'absolute'
  });

  // Custom formatter or default tooltip content
  const tooltipContent = formatter 
    ? formatter(data)
    : (
      <>
        <div className={styles.pieChartTooltipLabel}>{data.label}</div>
        <div className={styles.pieChartTooltipValue}>{data.value.toLocaleString()}</div>
        {data.percentage !== undefined && (
          <div className={styles.pieChartTooltipPercent}>
            {(data.percentage * 100).toFixed(1)}%
          </div>
        )}
      </>
    );

  // If no reference element is provided, use mouse position
  if (!referenceElement) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Update tooltip position on mouse move
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (tooltipRef.current) {
          const tooltipWidth = tooltipRef.current.offsetWidth;
          const tooltipHeight = tooltipRef.current.offsetHeight;
          
          // Position tooltip to avoid going off screen
          const x = e.clientX + tooltipWidth + 10 > window.innerWidth
            ? e.clientX - tooltipWidth - 10
            : e.clientX + 10;
            
          const y = e.clientY + tooltipHeight + 10 > window.innerHeight
            ? e.clientY - tooltipHeight - 10
            : e.clientY + 10;
            
          setPosition({ x, y });
        }
      };
      
      // Throttle the mousemove event for better performance
      let ticking = false;
      const throttledMouseMove = (e: MouseEvent) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleMouseMove(e);
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener('mousemove', throttledMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', throttledMouseMove);
      };
    }, []);

    return (
      <div
        ref={tooltipRef}
        className={styles.pieChartTooltip}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {tooltipContent}
      </div>
    );
  }

  // Use Popper.js positioning if reference element is provided
  return (
    <div 
      ref={setPopperElement}
      className={styles.pieChartTooltip}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      {tooltipContent}
      <div ref={setArrowElement} className={styles.tooltipArrow} style={popperStyles.arrow} />
    </div>
  );
};