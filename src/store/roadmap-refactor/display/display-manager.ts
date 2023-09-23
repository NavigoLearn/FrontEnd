import { atom } from 'nanostores';

export type IDisplayStyles = 'right' | 'rightExtended' | 'fullScreen';
export type IDisplayPageType = 'editor' | 'issues' | 'about' | 'tab' | 'closed';

const storeDisplayManager = atom({
  // holds roadmap-data about the currently displayed TAB
  type: 'closed', //  type of tab opened
} as {
  type: IDisplayPageType;
});

export function setDisplayPageType(type: IDisplayPageType) {
  const originalStore = storeDisplayManager.get();
  storeDisplayManager.set({
    ...originalStore,
    type,
  });
}

export function getDisplayPageType() {
  const originalStore = storeDisplayManager.get();
  return originalStore.type;
}

export default storeDisplayManager;
