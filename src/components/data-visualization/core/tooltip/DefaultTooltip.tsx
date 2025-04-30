import React from 'react';
import styles from './Tooltip.module.css';

export interface DefaultTooltipProps {
  /** Title to display in the tooltip */
  title?: React.ReactNode;
  /** Content to display in the tooltip */
  content?: React.ReactNode;
  /** Optional color indicator */
  color?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * DefaultTooltip component for displaying simple title/content tooltips
 */
export const DefaultTooltip: React.FC<DefaultTooltipProps> = ({
  title,
  content,
  color,
  className = '',
}) => {
  return (
    <div className={`${styles.tooltipDefaultTooltip} ${className}`}>
      {color && (
        <div 
          className={styles.tooltipColorIndicator} 
          style={{ backgroundColor: color }}
        />
      )}
      <div className={styles.tooltipContent}>
        {title && <h4 className={styles.tooltipTitle}>{title}</h4>}
        {content && <div className={styles.tooltipBody}>{content}</div>}
      </div>
    </div>
  );
};

export default DefaultTooltip;