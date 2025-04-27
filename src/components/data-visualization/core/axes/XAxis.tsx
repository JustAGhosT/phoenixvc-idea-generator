import React from 'react';
import Axis, { AxisProps } from './Axis';

export type XAxisProps = Omit<AxisProps, 'type'>;

/**
 * XAxis component for rendering horizontal axes
 */
export const XAxis: React.FC<XAxisProps> = (props) => {
  return <Axis type="x" {...props} />;
};

export default XAxis;