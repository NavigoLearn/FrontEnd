import { atom } from 'nanostores';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';

export type IElementType = 'node' | 'component';

export const storeMouseCoords = atom({
  pageX: 0,
  pageY: 0,
});

export const storeResizeTrue = atom(false);

export const storeResizeSharedData = atom({
  initialMouseCoords: {},
  mouseAnchor: 'top',
  isReflective: false,
  elementType: 'node',
  mouseMoveHandler: null,
  setIsResizing: null,
} as {
  initialMouseCoords: ICoords;
  mouseAnchor: IMouseDragDirection;
  isReflective: boolean;
  elementType: IElementType;
  mouseMoveHandler: (e: MouseEvent, direction: IMouseDragDirection) => void;
  setIsResizing: () => void;
});

export const storeResizeSharedResize = atom({
  isResizing: false,
});

export const setIsResizingGlobalTrue = () => {
  const newStore = storeResizeSharedResize.get();
  newStore.isResizing = true;
  storeResizeSharedResize.set({ ...newStore });
};

export const setIsResizingGlobalFalseAfter100ms = () => {
  setTimeout(() => {
    const newStore = storeResizeSharedResize.get();
    newStore.isResizing = false;
    storeResizeSharedResize.set({ ...newStore });
  }, 100);
};

export const getIsResizingGlobal = () => {
  return storeResizeSharedResize.get().isResizing;
};

export const setResizeInitialMouseCoords = (coords: ICoords) => {
  const newStore = storeResizeSharedData.get();
  newStore.initialMouseCoords = coords;
  storeResizeSharedData.set({ ...newStore });
};

export const getResizeInitialMouseCoords = () => {
  return storeResizeSharedData.get().initialMouseCoords;
};

export const setResizeMouseAnchor = (anchor: IMouseDragDirection) => {
  const newStore = storeResizeSharedData.get();
  newStore.mouseAnchor = anchor;
  storeResizeSharedData.set({ ...newStore });
};

export const getResizeMouseAnchor = () => {
  return storeResizeSharedData.get().mouseAnchor;
};

export const setResizeIsReflective = (isReflective: boolean) => {
  const newStore = storeResizeSharedData.get();
  newStore.isReflective = isReflective;
  storeResizeSharedData.set({ ...newStore });
};

export const getResizeIsReflective = () => {
  return storeResizeSharedData.get().isReflective;
};

export const setResizeElementType = (elementType: IElementType) => {
  const newStore = storeResizeSharedData.get();
  newStore.elementType = elementType;
  storeResizeSharedData.set({ ...newStore });
};

export const getResizeElementType = () => {
  return storeResizeSharedData.get().elementType;
};

export const setResizeMouseMoveHandler = (
  mouseMoveHandler: (e: MouseEvent, direction: IMouseDragDirection) => void
) => {
  const newStore = storeResizeSharedData.get();
  newStore.mouseMoveHandler = mouseMoveHandler;
  storeResizeSharedData.set({ ...newStore });
};

export const getResizeMouseMoveHandler = () => {
  return storeResizeSharedData.get().mouseMoveHandler;
};

export const setResizeIsResizing = (setIsResizing: () => void) => {
  const newStore = storeResizeSharedData.get();
  newStore.setIsResizing = setIsResizing;
  storeResizeSharedData.set({ ...newStore });
};

export const getResizeIsResizingCallback = () => {
  return storeResizeSharedData.get().setIsResizing;
};

export function setMouseCoords(coords: ICoords) {
  storeMouseCoords.set({ pageX: coords.x, pageY: coords.y });
}

export function getMouseCoords() {
  return storeMouseCoords.get();
}

export function setResizeTrue() {
  storeResizeTrue.set(true);
}

export function setResizeFalse() {
  storeResizeTrue.set(false);
}

export function getResize() {
  return storeResizeTrue.get();
}

export const resetResizeAllStoresToDefault = () => {};
