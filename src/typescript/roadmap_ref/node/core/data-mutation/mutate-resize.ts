import {
  IMouseDragDirection,
  getResizeInitialSize,
  getPrevDeltaField,
  setPrevDeltaField,
  IMouseDirectionBase,
} from '@src/to-be-organized/resize-dragging/stores';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getIsRootNode } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  MINIMUM_NODE_HEIGHT,
  MINIMUM_NODE_WIDTH,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';
import { getAlt, getShift } from '@store/roadmap-refactor/misc/key-press-store';

function mutateNodeHeightBottom(node: NodeClass, deltaTopY: number) {
  const { data } = node;
  let dy = deltaTopY - getPrevDeltaField('bottom');
  let newHeight = data.height + dy;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    dy = newHeight - data.height;
    deltaTopY = dy + getPrevDeltaField('bottom');
  }
  setPrevDeltaField('bottom', deltaTopY);

  !getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y - dy);
  mutateNodeHeight(node, newHeight);
}

export function mutateNodeHeightTop(node: NodeClass, deltaTopY: number) {
  const { data } = node;
  let dy = deltaTopY - getPrevDeltaField('top');
  let newHeight = data.height + dy;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    dy = newHeight - data.height;
    deltaTopY = dy + getPrevDeltaField('top');
  }
  setPrevDeltaField('top', deltaTopY);

  getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y - dy);
  mutateNodeHeight(node, newHeight);
}

export function mutateNodeWidthLeft(node: NodeClass, deltaLeftX: number) {
  const { data } = node;
  let dx = deltaLeftX - getPrevDeltaField('left');
  let newWidth = data.width + dx;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    dx = newWidth - data.width;
    deltaLeftX = dx + getPrevDeltaField('left');
  }

  setPrevDeltaField('left', deltaLeftX);
  getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x - dx);
  mutateNodeWidth(node, newWidth);
}

export function mutateNodeWidthRight(node: NodeClass, deltaX: number) {
  const { data } = node;
  let dx = deltaX - getPrevDeltaField('right');
  let newWidth = data.width + dx;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    dx = newWidth - data.width;
    deltaX = dx + getPrevDeltaField('right');
  }

  setPrevDeltaField('right', deltaX);
  !getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x - dx);
  mutateNodeWidth(node, newWidth);
}

type IMutateFunction = (
  node: NodeClass,
  deltaXMouse: number,
  deltaYMouse: number
) => void;

export function handleResizeMirrorCallbacks(
  node: NodeClass,
  direction: IMouseDirectionBase,
  deltaXMouse: number,
  deltaYMouse: number
) {
  const mapper: Record<IMouseDirectionBase, () => void> = {
    top: () => {
      if (getAlt()) {
        mutateNodeHeightBottom(node, deltaYMouse);
      } else {
        mutateNodeHeightBottom(node, 0);
      }
    },
    bottom: () => {
      if (getAlt()) {
        mutateNodeHeightTop(node, deltaYMouse);
      } else {
        mutateNodeHeightTop(node, 0);
      }
    },

    left: () => {
      if (getAlt()) {
        mutateNodeWidthRight(node, deltaXMouse);
      } else {
        mutateNodeWidthRight(node, 0);
      }
    },

    right: () => {
      if (getAlt()) {
        mutateNodeWidthLeft(node, deltaXMouse);
      } else {
        mutateNodeWidthLeft(node, 0);
      }
    },
  };
  mapper[direction]();
}
export function getResizeNodeCallbacks(direction: IMouseDragDirection) {
  const mapper: Record<IMouseDragDirection, IMutateFunction> = {
    top: (node, deltaXMouse, deltaYMouse) => {
      mutateNodeHeightTop(node, deltaYMouse);
      handleResizeMirrorCallbacks(node, 'top', deltaXMouse, deltaYMouse);
    },
    bottom: (node, deltaXMouse, deltaYMouse) => {
      mutateNodeHeightBottom(node, deltaYMouse);
      handleResizeMirrorCallbacks(node, 'bottom', deltaXMouse, deltaYMouse);
    },
    left: (node, deltaXMouse, deltaYMouse) => {
      mutateNodeWidthLeft(node, deltaXMouse);
      handleResizeMirrorCallbacks(node, 'left', deltaXMouse, deltaYMouse);
    },
    right: (node, deltaXMouse, deltaYMouse) => {
      mutateNodeWidthRight(node, deltaXMouse);
      handleResizeMirrorCallbacks(node, 'right', deltaXMouse, deltaYMouse);
    },
    'bottom-left': (node, deltaXMouse, deltaYMouse) => {
      mutateNodeHeightBottom(node, deltaYMouse);
      mutateNodeWidthLeft(node, deltaXMouse);
      handleResizeMirrorCallbacks(node, 'left', deltaXMouse, deltaYMouse);
      handleResizeMirrorCallbacks(node, 'bottom', deltaXMouse, deltaYMouse);
    },
    'bottom-right': (node, deltaXMouse, deltaYMouse) => {
      mutateNodeHeightBottom(node, deltaYMouse);
      mutateNodeWidthRight(node, deltaXMouse);
      handleResizeMirrorCallbacks(node, 'right', deltaXMouse, deltaYMouse);
      handleResizeMirrorCallbacks(node, 'bottom', deltaXMouse, deltaYMouse);
    },
    'top-left': (node, deltaXMouse, deltaYMouse) => {
      mutateNodeHeightTop(node, deltaYMouse);
      mutateNodeWidthLeft(node, deltaXMouse);
      handleResizeMirrorCallbacks(node, 'top', deltaXMouse, deltaYMouse);
      handleResizeMirrorCallbacks(node, 'left', deltaXMouse, deltaYMouse);
    },
    'top-right': (node, deltaXMouse, deltaYMouse) => {
      mutateNodeHeightTop(node, deltaYMouse);
      mutateNodeWidthRight(node, deltaXMouse);
      handleResizeMirrorCallbacks(node, 'top', deltaXMouse, deltaYMouse);
      handleResizeMirrorCallbacks(node, 'right', deltaXMouse, deltaYMouse);
    },
  };

  return mapper[direction];
}
