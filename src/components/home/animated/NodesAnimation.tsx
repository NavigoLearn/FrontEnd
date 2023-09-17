import React from 'react';

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

const NodesAnimation = ({
  x1,
  x2,
  y1,
  y2,
  width,
  height,
  strokeOpacity,
}: INodesAnimation) => {
  let swappedX = false;
  let swappedY = false;

  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const isStraight = x1 === x2 || y1 === y2;

  // calculate gradients based on the angle
  const angleInRadians = (angle * Math.PI) / 180;
  const gradX1 = 0.5 + Math.cos(angleInRadians) * 0.5;
  const gradY1 = 0.5 + Math.sin(angleInRadians) * 0.5;
  const gradX2 = 0.5 - Math.cos(angleInRadians) * 0.5;
  const gradY2 = 0.5 - Math.sin(angleInRadians) * 0.5;

  if (x2 < x1) {
    // if x2 is less than x1, swap them
    [x1, x2] = [x2, x1];
    swappedX = true;
  }
  if (y2 < y1) {
    // if y2 is less than y1, swap them
    [y1, y2] = [y2, y1];
    swappedY = true;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${x1 - 3} ${y1 - 3} ${x2 + 3} ${y2 + 3}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        MiddleSection
        <linearGradient
          id={`gradientLine${angle}`}
          x1={`${(isStraight ? gradX2 : gradX1) * 100}%`}
          y1={`${(isStraight ? gradY2 : gradY1) * 100}%`}
          x2={`${(isStraight ? gradX1 : gradX2) * 100}%`}
          y2={`${(isStraight ? gradY1 : gradY2) * 100}%`}
        >
          <stop offset='0%' stopColor='white' stopOpacity={1} />
          <stop
            offset={isStraight ? '40%' : '60%'}
            stopColor={isStraight ? 'black' : 'white'}
            stopOpacity={1}
          />
          <stop offset='100%' stopColor='black' stopOpacity={0} />
        </linearGradient>
        <mask id={`maskLine${angle}`}>
          <rect
            x={x1 - 3}
            y={y1 - 3}
            width={Math.abs(x2 - x1) + 6}
            height={Math.abs(y2 - y1) + 6}
            fill={`url(#gradientLine${angle})`}
          />
        </mask>
      </defs>
      {/* debugging mask */}
      {/* <rect */}
      {/*  mask={`url(#maskLine${angle})`} */}
      {/*  fill='black' */}
      {/*  x={x1} */}
      {/*  y={y1} */}
      {/*  width={x2 - x1} */}
      {/*  height={y2 - y1} */}
      {/* /> */}

      <line
        x1={swappedX ? x2 : x1}
        x2={swappedX ? x1 : x2}
        y1={swappedY ? y2 : y1}
        y2={swappedY ? y1 : y2}
        d='M4 2H75'
        stroke='#3361D8'
        strokeOpacity={strokeOpacity}
        strokeWidth='3'
        strokeDasharray='4 12'
        strokeLinecap='round'
        mask={!isStraight ? `url(#maskLine${angle})` : undefined}
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
