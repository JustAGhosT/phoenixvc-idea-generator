import React from 'react';
import Axis, { AxisProps } from './Axis';

export type YAxisProps = Omit<AxisProps, 'type'>;

/**
 * YAxis component for rendering vertical axes
 */
export const YAxis: React.FC<YAxisProps> = (props) => {
  return <Axis type="y" {...props} />;
};

export default YAxis;