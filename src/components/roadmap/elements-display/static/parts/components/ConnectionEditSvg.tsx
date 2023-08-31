import React, { useState } from 'react';

type INodeEditSvgProps = {
  selected: boolean;
  size: number;
  callback?: () => void;
};

const ConnectionEditSvg = ({ selected, size, callback }: INodeEditSvgProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  const baseWidthRect = 4.14 * size;
  const baseHeightRect = 1.33 * size;
  const baseSvgWidth = 17 * size;
  const baseSvgHeight = 13 * size;
  const nonFocusFill = !mouseOver ? '#D9D9D9' : '#000000';
  const fill = selected ? '#004aff' : nonFocusFill;
  const coordinatesPoints = [
    { x: 3.29932, y: 3.57227 },
    { x: 7.25732, y: 6.6543 },
    { x: 11.2573, y: 9.6543 },
  ];
  const coordinatesPointsScaled = coordinatesPoints.map((point) => ({
    x: point.x * size,
    y: point.y * size,
    transform: `rotate(-142.723 ${point.x * size} ${point.y * size})`,
  }));
  return (
    <svg
      width={`${baseSvgWidth * size}`}
      height={`${baseSvgHeight * size}`}
      viewBox='0 0 17 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onMouseOver={() => {
        // setMouseOver(true);
      }}
      onMouseOut={() => {
        // setMouseOver(false);
      }}
      onClick={() => {
        if (typeof callback !== 'undefined') {
          callback();
        }
      }}
    >
      {coordinatesPointsScaled.map((point, index) => {
        return (
          <rect
            key={point.x}
            transform={point.transform}
            x={point.x}
            y={point.y}
            width={baseWidthRect}
            height={baseHeightRect}
            fill={fill}
            className='transition duration-300 ease-in-out'
          />
        );
      })}
    </svg>
  );
};

export default ConnectionEditSvg;
