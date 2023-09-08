import { atom } from 'nanostores';

export type IDisplayPageTypeFullScreen =
  | 'about'
  | 'setUp'
  | 'closed'
  | 'get-started'
  | 'reset-roadmap'
  | 'setup-screen';

const displayManagerStoreFullScreen = atom({
  type: 'closed',
} as {
  type: IDisplayPageTypeFullScreen;
});

export function setDisplayPageTypeFullScreen(type: IDisplayPageTypeFullScreen) {
  const originalStore = displayManagerStoreFullScreen.get();
  displayManagerStoreFullScreen.set({
    ...originalStore,
    type,
  });
}

export function getDisplayPageTypeFullScreen() {
  const originalStore = displayManagerStoreFullScreen.get();
  return originalStore.type;
}

export default displayManagerStoreFullScreen;
