import React, { useState } from 'react';

type INodeEditSvgProps = {
  selected: boolean;
  size: number;
  callback?: () => void;
};

const NodeEditSvg = ({ selected, size, callback }: INodeEditSvgProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  const nonFocusFill = !mouseOver ? '#D9D9D9' : '#000000';
  const fill = selected ? '#004aff' : nonFocusFill;
  const ratio = 32 / 20;
  return (
    <svg
      width={`${size * ratio}`}
      height={`${size}`}
      viewBox='0 -4 32 16'
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
      <g>
        <rect x='6' width='20' height='8' rx='2' fill='white' />
        <rect
          x='6.375'
          y='0.375'
          width='19.25'
          height='7.25'
          rx='1.625'
          stroke={fill}
          strokeWidth='0.75'
          className='transition duration-300 ease-in-out'
        />
      </g>
    </svg>
  );
};

export default NodeEditSvg;
