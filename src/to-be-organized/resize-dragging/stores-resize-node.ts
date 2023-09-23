import { atom } from 'nanostores';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

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

export type ISize = { width: number; height: number };
export const storeResizeNodeData = atom({
  initialElementCoords: {},
  initialSize: {},
  elementRef: null,
} as {
  initialElementCoords: ICoords;
  initialSize: ISize;
  elementRef: NodeClass;
});

export const setResizeInitialElementCoords = (coords: ICoords) => {
  const newStore = storeResizeNodeData.get();
  newStore.initialElementCoords = coords;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeInitialElementCoords = () => {
  return storeResizeNodeData.get().initialElementCoords;
};

export const setResizeNodeRef = (elementRef: NodeClass) => {
  const newStore = storeResizeNodeData.get();
  newStore.elementRef = elementRef;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeNodeRef = () => {
  return storeResizeNodeData.get().elementRef;
};

export const setResizeNodeInitialSize = (size: ISize) => {
  const newStore = storeResizeNodeData.get();
  newStore.initialSize = size;
  storeResizeNodeData.set({ ...newStore });
};

export const getResizeNodeInitialSize = () => {
  return storeResizeNodeData.get().initialSize;
};
