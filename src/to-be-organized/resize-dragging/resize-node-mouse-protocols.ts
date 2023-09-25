import {
  getResizeNodeRef,
  setResizeInitialElementCoords,
  type IMouseDragDirection,
  setResizeNodeInitialSize,
} from '@src/to-be-organized/resize-dragging/stores-resize-node';
import {
  getResizeMouseAnchor,
  getResizeInitialMouseCoords,
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
import { type HashMapWithKeys } from '@type/roadmap/misc';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  subscribeToAlt,
  unSubscribeToAlt,
} from '@store/roadmap-refactor/misc/key-press-store';
import { triggerNodeConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';
import { snapResizingNodeProtocol } from '@src/typescript/roadmap_ref/snapping/snap-protocols/snap-nodes-resize';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { recalculateNodeChunksWithRoadmapSideEffects } from '@src/typescript/roadmap_ref/node/core/data-mutation/protocol';
import {
  endRecordResizeOrDrag,
  startRecordResizeOrDrag,
} from '@src/to-be-organized/undo-redo/recorders';

type IDeltaCalc = (eventY: number, startY: number) => number;

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
    null: (_, __) => 0,
  };

  // gets the mouse position Y without the event
  return deltasFunctions[actualDirection](e.pageY, y);
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
    null: (_, __) => 0,
  };

  return deltasFunctions[actualDirection](e.pageX, x);
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
  setIsResizingGlobalTrue();
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
  const { flags } = node;
  const isOnRoadmap = flags.renderedOnRoadmapFlag;
  if (isOnRoadmap) {
    recalculateNodeChunksWithRoadmapSideEffects(node);
  }
  resetResizeAllStoresToDefault();
  endRecordResizeOrDrag(node.id);
  setIsResizingGlobalFalseAfter100ms();

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
  startRecordResizeOrDrag(elementRef.id);

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
