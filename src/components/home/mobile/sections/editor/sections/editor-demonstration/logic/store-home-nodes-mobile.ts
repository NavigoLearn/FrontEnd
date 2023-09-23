import { atom } from 'nanostores';

export type IFocusedNode = 'basic' | 'main' | 'resource' | 'none';
export const storeHomeNodesMobile = atom({
  focusedNode: 'none',
} as {
  focusedNode: IFocusedNode;
});

export const setHomeEditorSelection = (node: IFocusedNode) => {
  storeHomeNodesMobile.set({ focusedNode: node });
};

export const getHomeEditorSelection = () => {
  return storeHomeNodesMobile.get().focusedNode;
};
