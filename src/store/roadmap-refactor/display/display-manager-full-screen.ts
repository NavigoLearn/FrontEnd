import { atom } from 'nanostores';

export type IDisplayPageTypeFullScreen =
  | 'about'
  | 'setUp'
  | 'closed'
  | 'get-started'
  | 'reset-roadmap'
  | 'setup-screen'
  | 'convert-to-draft'
  | 'delete-roadmap'
  | 'save-changes'
  | 'cancel-changes'
  | 'unsafe-link';

const displayManagerStoreFullScreen = atom({
  type: 'closed',
  additionalData: '',
} as {
  type: IDisplayPageTypeFullScreen;
  additionalData: string;
});

export function setDisplayPageTypeFullScreen(
  type: IDisplayPageTypeFullScreen,
  additionalData?: string
) {
  const originalStore = displayManagerStoreFullScreen.get();
  displayManagerStoreFullScreen.set({
    ...originalStore,
    type,
    additionalData: additionalData || '',
  });
}

export function getDisplayPageTypeFullScreen() {
  const originalStore = displayManagerStoreFullScreen.get();
  return originalStore;
}

export default displayManagerStoreFullScreen;
