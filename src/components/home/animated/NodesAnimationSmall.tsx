import React from 'react';
import { motion } from 'framer-motion';

type INodesAnimation = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  width?: number;
  height?: number;
  strokeOpacity?: number;
};

const defaultProps: INodesAnimation = {
  x1: 0,
  x2: 75,
  y1: 0,
  y2: 0,
  width: 120,
  height: 100,
  strokeOpacity: 0.6,
};

const NodesAnimationSmall = ({
  x1,
  x2,
  y1,
  y2,
  width,
  height,
  strokeOpacity,
}: INodesAnimation) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 79 4'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <motion.line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        d='M4 2H75'
        stroke='#1A1B50'
        strokeOpacity={strokeOpacity}
        strokeWidth='3'
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
    </svg>
  );
};

NodesAnimationSmall.defaultProps = defaultProps;

export default NodesAnimationSmall;
