import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

type IDraggingSizeWrapperProps = {
  style: {
    width: number;
    height: number;
  };
  widthCallback: (width: number) => void;
  heightCallback: (height: number) => void;
};
const DraggingResizeElement = ({
  style,
  widthCallback,
  heightCallback,
}: IDraggingSizeWrapperProps) => {
  const wrapperDiv = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    wrapperDiv.current.style.width = `${style.width}px`;
    wrapperDiv.current.style.height = `${style.height}px`;
  }, [style]);

  const handleMouseDown = (e, direction: 'vertical' | 'horizontal') => {
    startPos.current = { x: e.clientX, y: e.clientY };
    console.log('startPos', startPos.current);
  };
  // uses 8 invisible divs to allow user to resize in each direction
  // -1.5px accounts for the borders of the node and the resize div
  return (
    <div
      ref={wrapperDiv}
      className='border-2 border-black top-[-1.5px] left-[-1.5px] absolute'
    >
      <div
        onClick={(e) => {
          handleMouseDown(e, 'vertical');
        }}
        className='absolute top-0 cursor-ns-resize w-full h-1 left-0 bg-red-200 '
      />
      <div
        onClick={(e) => {
          handleMouseDown(e, 'vertical');
        }}
        className='absolute bottom-0 cursor-ns-resize w-full h-1 left-0 bg-red-200'
      />
      <div
        onClick={(e) => {
          handleMouseDown(e, 'horizontal');
        }}
        className='absolute top-0 cursor-ew-resize h-full left-0 w-1 bg-red-200'
      />
      <div
        onClick={(e) => {
          handleMouseDown(e, 'horizontal');
        }}
        className='absolute top-0 cursor-ew-resize h-full right-0 w-1 bg-red-200'
      />
    </div>
  );
};

export default DraggingResizeElement;
