import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';
import {
  getResizeMouseAnchor,
  setResizeInitialMouseCoords,
  setResizeMouseAnchor,
  setResizeMouseMoveHandler,
  getResizeMouseMoveHandler,
  getResizeIsResizingCallback,
  resetResizeAllStoresToDefault,
  setMouseCoords,
  getMouseCoords,
  setResizeFalse,
  setResizeTrue,
  type IElementType,
  setIsResizingGlobalTrue,
  setIsResizingGlobalFalseAfter100ms,
} from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import { getResizeCallback } from '@src/to-be-organized/resize-dragging/resize-logic';
import {
  getRoadmapDisableInteractions,
  getRoadmapEnableInteractions,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  subscribeToAlt,
  unSubscribeToAlt,
} from '@store/roadmap-refactor/misc/key-press-store';
import { afterEventLoop } from '@src/typescript/utils/misc';
import {
  calculateDeltaX,
  calculateDeltaY,
} from '@src/to-be-organized/resize-dragging/resize-node-mouse-protocols';
import {
  getResizeComponentRef,
  setResizeComponentInitialCoords,
  setResizeComponentInitialSize,
} from '@src/to-be-organized/resize-dragging/stores-resize-components';

const handleDeltasFromOriginalPointCalculations = (
  mouseMoveEvent,
  direction: IMouseDragDirection
) => {
  const scale = getScaleSafari();

  const deltaY = calculateDeltaY(mouseMoveEvent, direction) / scale;
  const deltaX = calculateDeltaX(mouseMoveEvent, direction) / scale;

  return { deltaX, deltaY };
};

const handleResizeComponentMouseMove = throttle(() => {
  const direction = getResizeMouseAnchor();
  const type: IElementType = 'component';
  const elementRef = getResizeComponentRef();
  const resizeCallback = getResizeCallback(direction, type);
  const mouseMoveEvent = getMouseCoords();

  // gets the delta from the mouse position relative to the place it was mouseDown initially
  const { deltaY, deltaX } = handleDeltasFromOriginalPointCalculations(
    mouseMoveEvent,
    direction
  );

  setIsResizingGlobalTrue();
  resizeCallback(deltaX, deltaY);

  const parentId = elementRef.parentNodeId;
  triggerNodeRerender(parentId);
}, 1000 / 60);

const handleResizeComponentMouseUp = (e) => {
  const moveHandler = getResizeMouseMoveHandler();
  // no idea why that ts error is there
  // @ts-ignore
  unSubscribeToAlt(moveHandler);
  // @ts-ignore
  document.removeEventListener('mousemove', moveHandler);
  document.removeEventListener('mouseup', handleResizeComponentMouseUp);
  getRoadmapEnableInteractions()();
  resetResizeAllStoresToDefault();
  setIsResizingGlobalFalseAfter100ms();
  window.getSelection().removeAllRanges(); // Deselect any selected text

  afterEventLoop(() => {
    setResizeFalse();
  });

  e.stopPropagation();
};

export const handleResizeComponentMouseDown = (
  mouseDownEvent,
  direction: IMouseDragDirection
) => {
  getRoadmapDisableInteractions()();

  setResizeInitialMouseCoords({
    x: mouseDownEvent.pageX,
    y: mouseDownEvent.pageY,
  });

  const componentRef = getResizeComponentRef();
  setResizeComponentInitialCoords({
    x: componentRef.x,
    y: componentRef.y,
  });

  setResizeComponentInitialSize({
    width: componentRef.width,
    height: componentRef.height,
  });

  setResizeTrue();
  setResizeMouseAnchor(direction);

  const mouseMoveHandler = (mouseMoveEvent?) => {
    if (mouseMoveEvent) {
      setMouseCoords({
        x: mouseMoveEvent.pageX,
        y: mouseMoveEvent.pageY,
      });
    }
    handleResizeComponentMouseMove(direction);
  };

  subscribeToAlt(mouseMoveHandler);
  setResizeMouseMoveHandler(mouseMoveHandler);

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', handleResizeComponentMouseUp);
};
