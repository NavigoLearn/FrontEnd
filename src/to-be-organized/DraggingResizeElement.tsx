import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { setDraggabilityAllElements } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { disableRoadmapDragZoom } from '@src/typescript/roadmap_ref/render/zoom-d3';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';

type IDraggingSizeWrapperProps = {
  style: {
    width: number;
    height: number;
  };
  widthCallback: (width: number) => void;
  heightCallback: (height: number) => void;
  elementId: string;
};
const DraggingResizeElement = ({
  style,
  widthCallback,
  heightCallback,
  elementId,
}: IDraggingSizeWrapperProps) => {
  const wrapperDiv = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    wrapperDiv.current.style.width = `${style.width}px`;
    wrapperDiv.current.style.height = `${style.height}px`;
  }, [style]);

  function handleMouseMove(e) {
    console.log('mousemove');
    const { x, y } = startPos.current;
    const deltaX = e.pageX - x;
    const deltaY = e.pageY - y;
    const newWidth = style.width + deltaX;
    const newHeight = style.height + deltaY;
    widthCallback(newWidth);
    heightCallback(newHeight);
  }

  const handleMouseDown = (e, direction: 'vertical' | 'horizontal') => {
    startPos.current = { x: e.pageX, y: e.pageY };
    console.log('startPos', startPos.current);
    const throttledMouseMove = throttle(handleMouseMove, 1000 / 60);
    document.addEventListener('mousemove', throttledMouseMove);
  };
  // uses 8 invisible divs to allow user to resize in each direction
  // -1.5px accounts for the borders of the node and the resize div
  return (
    <div
      ref={wrapperDiv}
      className='border-2 border-black top-[-1.5px] left-[-1.5px] absolute'
    >
      <div
        onMouseDownCapture={(e) => {
          console.log('mousedowncapture');
          handleMouseDown(e, 'vertical');
          disableRoadmapDragZoom();
        }}
        className='absolute top-0 cursor-ns-resize w-full h-1 left-0 bg-red-200 '
      />
    </div>
  );
};

export default DraggingResizeElement;
