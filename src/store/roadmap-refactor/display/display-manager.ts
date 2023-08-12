import { atom } from 'nanostores';

export type IDisplayStyles = 'right' | 'rightExtended' | 'fullScreen';
export type IDisplayPageType = 'editor' | 'issues' | 'about' | 'tab' | 'closed';

const displayManagerStore = atom({
  // holds roadmap-data about the currently displayed TAB
  type: 'closed', //  type of tab opened
} as {
  type: IDisplayPageType;
});

export function setDisplayPageType(type: IDisplayPageType) {
  const originalStore = displayManagerStore.get();
  displayManagerStore.set({
    ...originalStore,
    type,
  });
}

export default displayManagerStore;
