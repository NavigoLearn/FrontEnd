import {
  getResizeElementRef,
  getResizeMouseAnchor,
  getResizeInitialCoords,
  IMouseDragDirection,
  setResizeInitialCoords,
  setResizeMouseAnchor,
  getResizeElementType,
  setResizeMouseMoveHandler,
  getResizeMouseMoveHandler,
  setResizeInitialSize,
  getResizeIsResizingCallback,
  resetResizeAllStoresToDefault,
  setMouseCoords,
  getMouseCoords,
} from '@src/to-be-organized/resize-dragging/stores';
import { getResizeCallback } from '@src/to-be-organized/resize-dragging/resize-logic';
import {
  getRoadmapDisableInteractions,
  getRoadmapEnableInteractions,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';
import { MINIMUM_NODE_HEIGHT } from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';
import { HashMapWithKeys } from '@type/roadmap/misc';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  subscribeToAlt,
  unSubscribeToAlt,
} from '@store/roadmap-refactor/misc/key-press-store';

type IDeltaCalc = (eventY, startY) => number;

function calculateDeltaY(e, direction: IMouseDragDirection): number {
  const { y } = getResizeInitialCoords();
  const directionMapper: HashMapWithKeys<
    IMouseDragDirection,
    IMouseDragDirection | 'null'
  > = {
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

  // gets the mouse position Y without the event
  const deltaY = deltasFunctions[actualDirection](e.pageY, y);
  return deltaY;
}

function calculateDeltaX(e, direction: IMouseDragDirection): number {
  const { x } = getResizeInitialCoords();
  const directionMapper: HashMapWithKeys<
    IMouseDragDirection,
    IMouseDragDirection | 'null'
  > = {
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

const handleDeltasFromOriginalPointCalculations = (
  mouseMoveEvent,
  direction: IMouseDragDirection
) => {
  const scale = getScaleSafari();

  const deltaY = calculateDeltaY(mouseMoveEvent, direction) / scale;
  const deltaX = calculateDeltaX(mouseMoveEvent, direction) / scale;

  return { deltaX, deltaY };
};

const handleMouseMove = throttle(() => {
  const direction = getResizeMouseAnchor();
  const type = getResizeElementType();
  const elementRef = getResizeElementRef();
  const resizeCallback = getResizeCallback(direction, type, elementRef);
  const mouseMoveEvent = getMouseCoords();

  // gets the delta from the mouse position relative to the place it was mouseDown initially
  const { deltaY, deltaX } = handleDeltasFromOriginalPointCalculations(
    mouseMoveEvent,
    direction
  );

  getResizeIsResizingCallback()();
  resizeCallback(deltaX, deltaY); // we resized the node
  // we snap the node here ( ͡° ͜ʖ ͡°)

  triggerNodeRerender(elementRef.id);
}, 1000 / 60);

const handleMouseUp = (e) => {
  const moveHandler = getResizeMouseMoveHandler();
  // no idea why that ts error is there
  // @ts-ignore
  unSubscribeToAlt(moveHandler);
  // @ts-ignore
  document.removeEventListener('mousemove', moveHandler);
  document.removeEventListener('mouseup', handleMouseUp);
  getRoadmapEnableInteractions()();
  resetResizeAllStoresToDefault();
  window.getSelection().removeAllRanges(); // Deselect any selected text
  e.stopPropagation();
};

export const handleResizeMouseDown = (
  mouseDownEvent,
  direction: IMouseDragDirection
) => {
  getRoadmapDisableInteractions()();

  setResizeInitialCoords({
    x: mouseDownEvent.pageX,
    y: mouseDownEvent.pageY,
  });
  setResizeInitialSize({
    width: getResizeElementRef().data.width,
    height: getResizeElementRef().data.height,
  });

  setResizeMouseAnchor(direction);

  const mouseMoveHandler = (mouseMoveEvent?) => {
    if (mouseMoveEvent) {
      setMouseCoords({
        x: mouseMoveEvent.pageX,
        y: mouseMoveEvent.pageY,
      });
    }
    handleMouseMove(direction);
  };

  subscribeToAlt(mouseMoveHandler);

  setResizeMouseMoveHandler(mouseMoveHandler);
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', handleMouseUp);
};
