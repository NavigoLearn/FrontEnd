import React from 'react';

type INodesAnimation = {
  width?: number;
  height?: number;
};

const defaultProps: INodesAnimation = {
  width: 120,
  height: 100,
};

const NodesAnimation = () => {
  const WIDTH = 300;
  const HEIGHT = 300;
  const START_X = 150;
  const START_Y = 0;
  const END_X = 150;
  const END_Y = 300;

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox='0 0 300 300'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className=''
    >
      <line
        x1={START_X}
        y1={START_Y}
        x2={END_X}
        y2={END_Y}
        stroke='#3361D8'
        strokeWidth='3'
        strokeDasharray='4 12'
        strokeLinecap='round'
      >
        <animate
          attributeName='stroke-dashoffset'
          from='0'
          to='-14'
          dur='0.3s'
          repeatCount='indefinite'
        />
      </line>
    </svg>
  );
};

NodesAnimation.defaultProps = defaultProps;

export default NodesAnimation;
