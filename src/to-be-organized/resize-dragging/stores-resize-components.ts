import { atom } from 'nanostores';
import { type IComponentClasses } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';

type ISize = { width: number; height: number };
export const storeResizeComponentData = atom({
  elementRef: null,
  initialElementCoords: {},
  initialSize: {},
} as {
  elementRef: IComponentClasses;
  initialElementCoords: ICoords;
  initialSize: ISize;
});

export function setResizeComponentRef(elementRef: IComponentClasses) {
  const originalData = storeResizeComponentData.get();
  originalData.elementRef = elementRef;
  storeResizeComponentData.set({ ...originalData });
}

export function getResizeComponentRef(): IComponentClasses {
  return storeResizeComponentData.get().elementRef;
}

export function setResizeComponentInitialCoords(coords: ICoords) {
  const originalData = storeResizeComponentData.get();
  originalData.initialElementCoords = coords;
  storeResizeComponentData.set({ ...originalData });
}

export function getResizeComponentInitialCoords(): ICoords {
  return storeResizeComponentData.get().initialElementCoords;
}

export function setResizeComponentInitialSize(size: ISize) {
  const originalData = storeResizeComponentData.get();
  originalData.initialSize = size;
  storeResizeComponentData.set({ ...originalData });
}

export function getResizeComponentInitialSize(): ISize {
  return storeResizeComponentData.get().initialSize;
}
