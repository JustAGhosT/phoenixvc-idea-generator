import React from 'react';
import DefaultTooltip from './DefaultTooltip';
import TooltipContainer, { TooltipContainerProps } from './TooltipContainer';

export interface ChartTooltipProps extends Omit<TooltipContainerProps, 'children'> {
  /** Content of the tooltip */
  content: React.ReactNode;
}

/**
 * ChartTooltip component for displaying tooltips on charts
 * 
 * This is a convenience wrapper around TooltipContainer that handles
 * common tooltip content formatting.
 */
export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  content,
  ...containerProps
}) => {
  return (
    <TooltipContainer {...containerProps}>
      {typeof content === 'string' ? (
        <DefaultTooltip content={content} />
      ) : (
        content
      )}
    </TooltipContainer>
  );
};

export default ChartTooltip;