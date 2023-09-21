import React from 'react';
import { motion } from 'framer-motion';

type INodeConnectionProps = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
};

const defaultProps: INodeConnectionProps = {
  x1: 0,
  x2: 75,
  y1: 0,
  y2: 0,
};

const NodeConnectionM = ({ x1, x2, y1, y2 }: INodeConnectionProps) => {
  return (
    <motion.line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      d='M4 2H75'
      stroke='#1A1B50'
      strokeWidth='2.5'
      strokeDasharray='2 6'
      strokeLinecap='round'
    >
      <animate
        attributeName='stroke-dashoffset'
        from='0'
        to='-14'
        dur='0.3s'
        repeatCount='indefinite'
      />
    </motion.line>
  );
};

NodeConnectionM.defaultProps = defaultProps;

export default NodeConnectionM;
