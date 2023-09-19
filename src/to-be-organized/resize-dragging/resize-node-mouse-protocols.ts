import {
  getResizeNodeRef,
  setResizeInitialElementCoords,
  IMouseDragDirection,
  setResizeNodeInitialSize,
} from '@src/to-be-organized/resize-dragging/stores-resize-node';
import {
  getResizeMouseAnchor,
  getResizeInitialMouseCoords,
  setResizeInitialMouseCoords,
  setResizeMouseAnchor,
  getResizeElementType,
  setResizeMouseMoveHandler,
  getResizeMouseMoveHandler,
  getResizeIsResizingCallback,
  resetResizeAllStoresToDefault,
  setMouseCoords,
  getMouseCoords,
  setResizeFalse,
  setResizeTrue,
} from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import { getResizeCallback } from '@src/to-be-organized/resize-dragging/resize-logic';
import {
  getRoadmapDisableInteractions,
  getRoadmapEnableInteractions,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';
import { HashMapWithKeys } from '@type/roadmap/misc';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  subscribeToAlt,
  unSubscribeToAlt,
} from '@store/roadmap-refactor/misc/key-press-store';
import { triggerNodeConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';
import { snapResizingNodeProtocol } from '@src/typescript/roadmap_ref/snapping/snap-protocols/snap-nodes-resize';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { recalculateNodeChunks } from '@src/typescript/roadmap_ref/node/core/calculations/general';
import { recalculateNodeChunksWithRoadmapSideEffects } from '@src/typescript/roadmap_ref/node/core/data-mutation/protocol';

type IDeltaCalc = (eventY, startY) => number;

export function calculateDeltaY(e, direction: IMouseDragDirection): number {
  const { y } = getResizeInitialMouseCoords();
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

export function calculateDeltaX(e, direction: IMouseDragDirection): number {
  const { x } = getResizeInitialMouseCoords();
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

const handleResizeNodeMouseMove = throttle(() => {
  const direction = getResizeMouseAnchor();
  const type = 'node';
  const elementRef = getResizeNodeRef();
  const resizeCallback = getResizeCallback(direction, type);
  const mouseMoveEvent = getMouseCoords();

  // gets the delta from the mouse position relative to the place it was mouseDown initially
  const { deltaY, deltaX } = handleDeltasFromOriginalPointCalculations(
    mouseMoveEvent,
    direction
  );

  getResizeIsResizingCallback()();
  resizeCallback(deltaX, deltaY); // we resized the node
  snapResizingNodeProtocol(elementRef, direction);

  triggerNodeRerender(elementRef.id);
  triggerNodeConnectionsRerender(elementRef.id);
}, 1000 / 60);

const handleResizeNodeMouseUp = (e) => {
  const moveHandler = getResizeMouseMoveHandler();
  // no idea why that ts error is there
  // @ts-ignore
  unSubscribeToAlt(moveHandler);
  // @ts-ignore
  document.removeEventListener('mousemove', moveHandler);
  document.removeEventListener('mouseup', handleResizeNodeMouseUp);

  getRoadmapEnableInteractions()();
  const node = getResizeNodeRef();
  recalculateNodeChunksWithRoadmapSideEffects(node);

  resetResizeAllStoresToDefault();

  window.getSelection().removeAllRanges(); // Deselect any selected text

  afterEventLoop(() => {
    setResizeFalse();
  });

  e.stopPropagation();
};

export const handleResizeNodeMouseDown = (
  mouseDownEvent,
  direction: IMouseDragDirection
) => {
  getRoadmapDisableInteractions()();

  setResizeInitialMouseCoords({
    x: mouseDownEvent.pageX,
    y: mouseDownEvent.pageY,
  });

  const elementRef = getResizeNodeRef();
  setResizeInitialElementCoords({
    x: elementRef.data.coords.x,
    y: elementRef.data.coords.y,
  });

  setResizeNodeInitialSize({
    width: getResizeNodeRef().data.width,
    height: getResizeNodeRef().data.height,
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
    handleResizeNodeMouseMove(direction);
  };

  subscribeToAlt(mouseMoveHandler);
  setResizeMouseMoveHandler(mouseMoveHandler);
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', handleResizeNodeMouseUp);
};
