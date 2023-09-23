import {
  type IMouseDragDirection,
  getResizeNodeInitialSize,
  getResizeInitialElementCoords,
  getResizeNodeRef,
} from '@src/to-be-organized/resize-dragging/stores-resize-node';
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

export function getNodeAnchors(width, heigh, x, y) {
  const anchors = {
    top: {
      x: x + width / 2,
      y,
    },
    bottom: {
      x: x + width / 2,
      y: y + heigh,
    },
    left: {
      x,
      y: y + heigh / 2,
    },
    right: {
      x: x + width,
      y: y + heigh / 2,
    },
  };
  return anchors;
}
export function mutateNodeHeightBottomDy(node: NodeClass, dy: number) {
  const { data } = node;
  let newHeight = data.height + dy;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    dy = newHeight - data.height;
  }
  !getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y + dy / 2);
  getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y);
  mutateNodeHeight(node, newHeight);
}

export function mutateNodeWidthXAxisDx(node: NodeClass, dx: number) {
  const { data } = node;
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();

  let newWidth = data.width + dx * 2;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    dx = newWidth - originalWidth;
    return;
  }

  getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x - dx);
  !getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x);
  mutateNodeWidth(node, newWidth);
}

export function mutateNodeHeightYAxisDy(node: NodeClass, dy: number) {
  const { data } = node;
  let newHeight = data.height + dy * 2;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    dy = newHeight - data.height;
    return;
  }
  getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y - dy);
  !getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y);
  mutateNodeHeight(node, newHeight);
}

export function mutateNodeHeightTopDy(node: NodeClass, dy: number) {
  const { data } = node;
  let newHeight = data.height + dy;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    dy = newHeight - data.height;
  }
  getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y - dy);
  !getIsRootNode(node.id) && mutateNodeCoordY(node, data.coords.y - dy / 2);
  mutateNodeHeight(node, newHeight);
}

export function mutateNodeWidthLeftDx(node: NodeClass, dx: number) {
  const { data } = node;
  let newWidth = data.width + dx;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    dx = newWidth - data.width;
  }

  getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x - dx);
  !getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x - dx / 2);
  mutateNodeWidth(node, newWidth);
}

export function mutateNodeWidthRightDx(node: NodeClass, dx: number) {
  const { data } = node;
  let newWidth = data.width + dx;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    dx = newWidth - data.width;
  }

  !getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x + dx / 2);
  getIsRootNode(node.id) && mutateNodeCoordX(node, data.coords.x);
  mutateNodeWidth(node, newWidth);
}

function mutateNodeHeightBottom(node: NodeClass, deltaTopY: number) {
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();
  const { x: originalX, y: originalY } = getResizeInitialElementCoords();

  let newHeight = originalHeight + deltaTopY;
  let offsetY = deltaTopY;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    offsetY = newHeight - originalHeight;
  }

  !getIsRootNode(node.id) && mutateNodeCoordY(node, originalY + offsetY / 2);
  getIsRootNode(node.id) && mutateNodeCoordY(node, originalY);

  mutateNodeHeight(node, originalHeight + offsetY);
}

export function mutateNodeHeightTop(node: NodeClass, deltaTopY: number) {
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();
  const { x: originalX, y: originalY } = getResizeInitialElementCoords();

  let newHeight = originalHeight + deltaTopY;
  let offsetY = deltaTopY;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    offsetY = newHeight - originalHeight;
  }

  getIsRootNode(node.id) && mutateNodeCoordY(node, originalY - offsetY);
  !getIsRootNode(node.id) && mutateNodeCoordY(node, originalY - offsetY / 2);

  mutateNodeHeight(node, originalHeight + offsetY);
}

export function mutateNodeHeightYAxis(node: NodeClass, deltaTopY: number) {
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();
  const { x: originalX, y: originalY } = getResizeInitialElementCoords();

  let newHeight = originalHeight + deltaTopY * 2;
  let offsetY = deltaTopY * 2;

  if (newHeight < MINIMUM_NODE_HEIGHT) {
    newHeight = MINIMUM_NODE_HEIGHT;
    offsetY = newHeight - originalHeight;
  }

  getIsRootNode(node.id) && mutateNodeCoordY(node, originalY - offsetY / 2);
  !getIsRootNode(node.id) && mutateNodeCoordY(node, originalY);
  mutateNodeHeight(node, originalHeight + offsetY);
}

export function mutateNodeWidthLeft(node: NodeClass, deltaLeftX: number) {
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();
  const { x: originalX, y: originalY } = getResizeInitialElementCoords();

  let newWidth = originalWidth + deltaLeftX;
  let offsetX = deltaLeftX;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    offsetX = newWidth - originalWidth;
  }

  getIsRootNode(node.id) && mutateNodeCoordX(node, originalX - offsetX);
  !getIsRootNode(node.id) && mutateNodeCoordX(node, originalX - offsetX / 2);

  mutateNodeWidth(node, originalWidth + offsetX);
}

export function mutateNodeWidthRight(node: NodeClass, deltaX: number) {
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();
  const { x: originalX, y: originalY } = getResizeInitialElementCoords();

  let newWidth = originalWidth + deltaX;
  let offsetX = deltaX;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    offsetX = newWidth - originalWidth;
  }

  !getIsRootNode(node.id) && mutateNodeCoordX(node, originalX + offsetX / 2);
  getIsRootNode(node.id) && mutateNodeCoordX(node, originalX);

  mutateNodeWidth(node, originalWidth + offsetX);
}

export function mutateNodeWidthXAxis(node: NodeClass, deltaX: number) {
  const { height: originalHeight, width: originalWidth } =
    getResizeNodeInitialSize();
  const { x: originalX, y: originalY } = getResizeInitialElementCoords();

  let offsetX = deltaX * 2;
  let newWidth = originalWidth + offsetX;

  if (newWidth < MINIMUM_NODE_WIDTH) {
    newWidth = MINIMUM_NODE_WIDTH;
    offsetX = newWidth - originalWidth;
  }

  getIsRootNode(node.id) && mutateNodeCoordX(node, originalX - offsetX / 2);
  !getIsRootNode(node.id) && mutateNodeCoordX(node, originalX);
  mutateNodeWidth(node, originalWidth + offsetX);
}

type IMutateFunction = (deltaXMouse: number, deltaYMouse: number) => void;

export function getResizeNodeCallbacks(direction: IMouseDragDirection) {
  const node = getResizeNodeRef();
  const mapperAlt: Record<IMouseDragDirection, IMutateFunction> = {
    top: (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightYAxis(node, deltaYMouse);
    },
    bottom: (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightYAxis(node, deltaYMouse);
    },
    left: (deltaXMouse, deltaYMouse) => {
      mutateNodeWidthXAxis(node, deltaXMouse);
    },
    right: (deltaXMouse, deltaYMouse) => {
      mutateNodeWidthXAxis(node, deltaXMouse);
    },
    'bottom-left': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightYAxis(node, deltaYMouse);
      mutateNodeWidthXAxis(node, deltaXMouse);
    },
    'bottom-right': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightYAxis(node, deltaYMouse);
      mutateNodeWidthXAxis(node, deltaXMouse);
    },
    'top-left': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightYAxis(node, deltaYMouse);
      mutateNodeWidthXAxis(node, deltaXMouse);
    },
    'top-right': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightYAxis(node, deltaYMouse);
      mutateNodeWidthXAxis(node, deltaXMouse);
    },
  };

  const mapperNonAlt: Record<IMouseDragDirection, IMutateFunction> = {
    top: (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightTop(node, deltaYMouse);
    },
    bottom: (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightBottom(node, deltaYMouse);
    },
    left: (deltaXMouse, deltaYMouse) => {
      mutateNodeWidthLeft(node, deltaXMouse);
    },
    right: (deltaXMouse, deltaYMouse) => {
      mutateNodeWidthRight(node, deltaXMouse);
    },
    'bottom-left': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightBottom(node, deltaYMouse);
      mutateNodeWidthLeft(node, deltaXMouse);
    },
    'bottom-right': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightBottom(node, deltaYMouse);
      mutateNodeWidthRight(node, deltaXMouse);
    },
    'top-left': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightTop(node, deltaYMouse);
      mutateNodeWidthLeft(node, deltaXMouse);
    },
    'top-right': (deltaXMouse, deltaYMouse) => {
      mutateNodeHeightTop(node, deltaYMouse);
      mutateNodeWidthRight(node, deltaXMouse);
    },
  };

  if (!getAlt()) {
    return mapperNonAlt[direction];
  }
  return mapperAlt[direction];
}
