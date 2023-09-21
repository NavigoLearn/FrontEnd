import { atom } from 'nanostores';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';

export type IElementType = 'node' | 'component';

export const storeMouseCoords = atom({
  pageX: 0,
  pageY: 0,
});

export const storeResizeTrue = atom(false);

export const storeResizeNodeData = atom({
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

export const setResizeInitialMouseCoords = (coords: ICoords) => {
  const newStore = storeResizeNodeData.get();
  newStore.initialMouseCoords = coords;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeInitialMouseCoords = () => {
  return storeResizeNodeData.get().initialMouseCoords;
};

export const setResizeMouseAnchor = (anchor: IMouseDragDirection) => {
  const newStore = storeResizeNodeData.get();
  newStore.mouseAnchor = anchor;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeMouseAnchor = () => {
  return storeResizeNodeData.get().mouseAnchor;
};

export const setResizeIsReflective = (isReflective: boolean) => {
  const newStore = storeResizeNodeData.get();
  newStore.isReflective = isReflective;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeIsReflective = () => {
  return storeResizeNodeData.get().isReflective;
};

export const setResizeElementType = (elementType: IElementType) => {
  const newStore = storeResizeNodeData.get();
  newStore.elementType = elementType;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeElementType = () => {
  return storeResizeNodeData.get().elementType;
};

export const setResizeMouseMoveHandler = (
  mouseMoveHandler: (e: MouseEvent, direction: IMouseDragDirection) => void
) => {
  const newStore = storeResizeNodeData.get();
  newStore.mouseMoveHandler = mouseMoveHandler;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeMouseMoveHandler = () => {
  return storeResizeNodeData.get().mouseMoveHandler;
};

export const setResizeIsResizing = (setIsResizing: () => void) => {
  const newStore = storeResizeNodeData.get();
  newStore.setIsResizing = setIsResizing;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeIsResizingCallback = () => {
  return storeResizeNodeData.get().setIsResizing;
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
