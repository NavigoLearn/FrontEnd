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
          x1={`${gradX1 * 100}%`}
          y1={`${gradY1 * 100}%`}
          x2={`${gradX2 * 100}%`}
          y2={`${gradY2 * 100}%`}
        >
          <stop offset='0%' stopColor='#3361D8' stopOpacity={1} />
          <stop
            offset={isStraight ? '0%' : '60%'}
            stopColor='#3361D8'
            stopOpacity={isStraight ? 0 : 1}
          />
          <stop
            offset={isStraight ? '50%' : '90%'}
            stopColor='#3361D8'
            stopOpacity={0}
          />
          <stop
            offset={isStraight ? '100%' : '100%'}
            stopColor='#3361D8'
            stopOpacity={isStraight ? 1 : 0}
          />
        </linearGradient>
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

      {!isStraight ? (
        <line
          x1={swappedX ? x2 : x1}
          y1={swappedY ? y2 : y1}
          x2={swappedX ? x1 : x2}
          y2={swappedY ? y1 : y2}
          stroke={`url(#gradientLine${angle})`}
          strokeOpacity={strokeOpacity}
          strokeWidth='3'
          strokeDasharray='4 12'
          strokeLinecap='round'
          mask={`url(#maskLine${angle})`}
        >
          <animate
            attributeName='stroke-dashoffset'
            from='0'
            to='-14'
            dur='0.3s'
            repeatCount='indefinite'
          />
        </line>
      ) : (
        <line
          x1={(swappedX ? x1 : x2) - 2}
          y1={swappedY ? y1 : y2}
          x2={swappedX ? x2 : x1}
          y2={swappedY ? y2 : y1}
          stroke={`url(#gradientLine${angle})`}
          strokeOpacity={strokeOpacity}
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
      )}
    </svg>
  );
};

NodesAnimation.defaultProps = defaultProps;

export default NodesAnimation;
