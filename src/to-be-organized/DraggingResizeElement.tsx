import React, { useEffect, useRef } from 'react';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import { HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import {
  getRoadmapDisableDrag,
  getRoadmapEnableDrag,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';
import { minimumNodeHeight } from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';

type IDraggingSizeWrapperProps = {
  style: {
    width: number;
    height: number;
  };
  widthCallback: (width: number) => void;
  heightCallback: (height: number) => void;
  snappingCallback: (
    width: number,
    height: number
  ) => { width: number; height: number };
};
const DraggingResizeElement = ({
  style,
  widthCallback,
  heightCallback,
  snappingCallback,
}: IDraggingSizeWrapperProps) => {
  const wrapperDiv = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const mouseMoveFunction = useRef(null);

  useEffect(() => {
    wrapperDiv.current.style.width = `${style.width}px`;
    wrapperDiv.current.style.height = `${style.height}px`;
  }, [style]);

  type IDirections =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  type IDeltaCalc = (eventY, startY) => number;

  function calculateNewHeight(e, direction: IDirections): number {
    const { y } = startPos.current;
    const directionMapper: HashMapWithKeys<IDirections, IDirections | 'null'> =
      {
        top: 'top',
        bottom: 'bottom',
        left: 'null',
        right: 'null',
        'bottom-left': 'bottom',
        'bottom-right': 'bottom',
        'top-left': 'top',
        'top-right': 'top',
      };

    const actualDirection = directionMapper[direction];

    const deltasFunctions: HashMapWithKeys<
      'top' | 'bottom' | 'null',
      IDeltaCalc
    > = {
      top: (eventY, startY) => startY - eventY,
      bottom: (eventY, startY) => eventY - startY,
      null: (eventY, startY) => 0,
    };

    const deltaY = deltasFunctions[actualDirection](e.pageY, y);
    return deltaY;
  }

  function calculateNewWidth(e, direction: IDirections): number {
    const { x } = startPos.current;
    const directionMapper: HashMapWithKeys<IDirections, IDirections | 'null'> =
      {
        top: 'null',
        bottom: 'null',
        left: 'left',
        right: 'right',
        'bottom-left': 'left',
        'bottom-right': 'right',
        'top-left': 'left',
        'top-right': 'right',
      };

    const actualDirection = directionMapper[direction];

    const deltasFunctions: HashMapWithKeys<
      'left' | 'right' | 'null',
      IDeltaCalc
    > = {
      left: (eventX, startX) => startX - eventX,
      right: (eventX, startX) => eventX - startX,
      null: (eventX, startX) => 0,
    };

    const deltaX = deltasFunctions[actualDirection](e.pageX, x);
    return deltaX;
  }

  const handleMouseMove = throttle((mouseMoveEvent, direction: IDirections) => {
    const scale = getScaleSafari();
    const deltaY = calculateNewHeight(mouseMoveEvent, direction) / scale;
    let newHeight = style.height + deltaY * 2; // also accounts for growing in the opposite direction

    const deltaX = calculateNewWidth(mouseMoveEvent, direction) / scale;
    let newWidth = style.width + deltaX * 2;

    if (newHeight < minimumNodeHeight) newHeight = minimumNodeHeight;
    if (newWidth < minimumNodeHeight) newWidth = minimumNodeHeight;

    const { width: finalWidth, height: finalHeight } = snappingCallback(
      newWidth,
      newHeight
    );

    heightCallback(finalHeight);
    widthCallback(finalWidth);
  }, 1000 / 60);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', mouseMoveFunction.current);
    document.removeEventListener('mouseup', handleMouseUp);
    getRoadmapEnableDrag()();
    window.getSelection().removeAllRanges(); // Deselect any selected text
  };

  const handleMouseDown = (mouseDownEvent, direction: IDirections) => {
    getRoadmapDisableDrag()();
    startPos.current = {
      x: mouseDownEvent.pageX,
      y: mouseDownEvent.pageY,
    };
    const mouseMoveHandler = (mouseMoveEvent) => {
      handleMouseMove(mouseMoveEvent, direction);
    };
    mouseMoveFunction.current = mouseMoveHandler;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // uses 8 invisible divs to allow user to resize in each direction
  // -1.5px accounts for the borders of the node and the resize div

  return (
    <div
      ref={wrapperDiv}
      className=' top-[-1.5px] left-[-1.5px] absolute pointer-events-auto '
    >
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'top');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute -top-2 cursor-ns-resize w-full h-2 left-0 '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'bottom');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute -bottom-2 left-0 cursor-ns-resize w-full h-2 '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'left');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute top-0 -left-2 cursor-ew-resize w-2 h-full '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'right');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute top-0 -right-2 cursor-ew-resize w-2 h-full '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'top-left'); // Param for top left
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute -top-2 -left-2 cursor-nwse-resize w-4 h-4 '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'top-right'); // Param for top right
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute -top-2 -right-2 cursor-nesw-resize w-4 h-4 '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'bottom-left'); // Param for bottom left
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute -bottom-2 -left-2 cursor-nesw-resize w-4 h-4 '
      />
      <div
        onMouseOverCapture={(e) => {}}
        onMouseDownCapture={(e) => {
          handleMouseDown(e, 'bottom-right'); // Param for bottom right
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute -bottom-2 -right-2 cursor-nwse-resize w-4 h-4 '
      />
    </div>
  );
};

export default DraggingResizeElement;
