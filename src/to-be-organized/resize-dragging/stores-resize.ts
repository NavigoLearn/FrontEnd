import { atom } from 'nanostores';
import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ComponentElement } from 'react';
import { IComponentClasses } from '@src/typescript/roadmap_ref/node/components/text/factories';

export type IMouseDragDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type IMouseDirectionBase = 'top' | 'bottom' | 'left' | 'right';

export type IElementType = 'node' | 'component';
export type ISize = { width: number; height: number };

export const storePrevDeltaCoords = atom({
  prevDeltaTop: 0,
  prevDeltaBottom: 0,
  prevDeltaLeft: 0,
  prevDeltaRight: 0,
});

export const storeMouseCoords = atom({
  pageX: 0,
  pageY: 0,
});

export function setMouseCoords(coords: ICoords) {
  storeMouseCoords.set({ pageX: coords.x, pageY: coords.y });
}

export function getMouseCoords() {
  return storeMouseCoords.get();
}

export function setPrevDeltaField(
  direction: IMouseDirectionBase,
  value: number
) {
  const newStore = storePrevDeltaCoords.get();
  if (direction === 'top') {
    newStore.prevDeltaTop = value;
    storePrevDeltaCoords.set({ ...newStore });
    return;
  }

  if (direction === 'bottom') {
    newStore.prevDeltaBottom = value;
    storePrevDeltaCoords.set({ ...newStore });
    return;
  }

  if (direction === 'left') {
    newStore.prevDeltaLeft = value;
    storePrevDeltaCoords.set({ ...newStore });
    return;
  }

  if (direction === 'right') {
    newStore.prevDeltaRight = value;
    storePrevDeltaCoords.set({ ...newStore });
    return;
  }
  throw new Error('Not valid direction');
}

export function getPrevDeltaField(direction: IMouseDirectionBase) {
  if (direction === 'top') {
    return storePrevDeltaCoords.get().prevDeltaTop;
  }

  if (direction === 'bottom') {
    return storePrevDeltaCoords.get().prevDeltaBottom;
  }

  if (direction === 'left') {
    return storePrevDeltaCoords.get().prevDeltaLeft;
  }

  if (direction === 'right') {
    return storePrevDeltaCoords.get().prevDeltaRight;
  }
  throw new Error('Not valid direction');
}

export const storeResizeTrue = atom(false);

export function setResizeTrue() {
  storeResizeTrue.set(true);
}

export function setResizeFalse() {
  storeResizeTrue.set(false);
}

export function getResize() {
  return storeResizeTrue.get();
}

export const storeResizeData = atom({
  initialMouseCoords: {},
  initialElementCoords: {},
  initialSize: {},
  mouseAnchor: 'top',
  isReflective: false,
  elementType: 'node',
  elementRef: null,
  mouseMoveHandler: null,
  setIsResizing: null,
} as {
  initialMouseCoords: ICoords;
  initialElementCoords: ICoords;
  initialSize: ISize;
  mouseAnchor: IMouseDragDirection;
  isReflective: boolean;
  elementType: IElementType;
  elementRef: NodeClass;
  mouseMoveHandler: (e: MouseEvent, direction: IMouseDragDirection) => void;
  setIsResizing: () => void;
});

export const setResizeInitialMouseCoords = (coords: ICoords) => {
  const newStore = storeResizeData.get();
  newStore.initialMouseCoords = coords;
  storeResizeData.set({ ...newStore });
};

export const getResizeInitialMouseCoords = () => {
  return storeResizeData.get().initialMouseCoords;
};

export const setResizeInitialElementCoords = (coords: ICoords) => {
  const newStore = storeResizeData.get();
  newStore.initialElementCoords = coords;
  storeResizeData.set({ ...newStore });
};

export const getResizeInitialElementCoords = () => {
  return storeResizeData.get().initialElementCoords;
};

export const setResizeMouseAnchor = (anchor: IMouseDragDirection) => {
  const newStore = storeResizeData.get();
  newStore.mouseAnchor = anchor;
  storeResizeData.set({ ...newStore });
};

export const getResizeMouseAnchor = () => {
  return storeResizeData.get().mouseAnchor;
};

export const setResizeIsReflective = (isReflective: boolean) => {
  const newStore = storeResizeData.get();
  newStore.isReflective = isReflective;
  storeResizeData.set({ ...newStore });
};

export const getResizeIsReflective = () => {
  return storeResizeData.get().isReflective;
};

export const setResizeElementType = (elementType: IElementType) => {
  const newStore = storeResizeData.get();
  newStore.elementType = elementType;
  storeResizeData.set({ ...newStore });
};

export const getResizeElementType = () => {
  return storeResizeData.get().elementType;
};

export const setResizeElementRef = (elementRef: NodeClass) => {
  const newStore = storeResizeData.get();
  newStore.elementRef = elementRef;
  storeResizeData.set({ ...newStore });
};

export const getResizeElementRef = () => {
  return storeResizeData.get().elementRef;
};

export const setResizeMouseMoveHandler = (
  mouseMoveHandler: (e: MouseEvent, direction: IMouseDragDirection) => void
) => {
  const newStore = storeResizeData.get();
  newStore.mouseMoveHandler = mouseMoveHandler;
  storeResizeData.set({ ...newStore });
};

export const getResizeMouseMoveHandler = () => {
  return storeResizeData.get().mouseMoveHandler;
};

export const setResizeInitialSize = (size: ISize) => {
  const newStore = storeResizeData.get();
  newStore.initialSize = size;
  storeResizeData.set({ ...newStore });
};

export const getResizeInitialSize = () => {
  return storeResizeData.get().initialSize;
};

export const setResizeIsResizing = (setIsResizing: () => void) => {
  const newStore = storeResizeData.get();
  newStore.setIsResizing = setIsResizing;
  storeResizeData.set({ ...newStore });
};

export const getResizeIsResizingCallback = () => {
  return storeResizeData.get().setIsResizing;
};

export const resetResizeAllStoresToDefault = () => {
  storeResizeData.set({
    initialElementCoords: {
      x: 0,
      y: 0,
    },
    initialMouseCoords: {
      x: 0,
      y: 0,
    },
    initialSize: {
      width: 0,
      height: 0,
    },
    mouseAnchor: 'top',
    isReflective: false,
    elementType: 'node',
    elementRef: null,
    mouseMoveHandler: null,
    setIsResizing: null,
  });

  storePrevDeltaCoords.set({
    prevDeltaTop: 0,
    prevDeltaBottom: 0,
    prevDeltaLeft: 0,
    prevDeltaRight: 0,
  });
};
