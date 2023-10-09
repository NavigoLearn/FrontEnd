import { atom } from 'nanostores';
import type { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';

interface ToolTipState {
  active: boolean;
}

export const nodeType = atom<IActionTypes>('Do nothing');

export const toolTipStore = atom<ToolTipState>({ active: false });

export const isZoomed = atom<boolean>(false);

export const toggleToolTip = atom<boolean>(true);

export const activateToolTip = () => {
  toolTipStore.set({ active: true });
};

export const deactivateToolTip = () => {
  toolTipStore.set({ active: false });
};

export const getActiveState = () => {
  return toolTipStore.get().active;
};

export const setNodeType = (type: IActionTypes) => {
  nodeType.set(type);
};

export const getNodeType = () => {
  return nodeType.get();
};

export const setZoomed = (zoomed: boolean) => {
  isZoomed.set(zoomed);
};

export const getZoomed = () => {
  return isZoomed.get();
};

export const setToggleToolTip = (toggle: boolean) => {
  toggleToolTip.set(toggle);
};

export const getToggleToolTip = () => {
  return toggleToolTip.get();
};
