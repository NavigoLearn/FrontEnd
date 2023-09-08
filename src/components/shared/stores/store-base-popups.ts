import { atom } from 'nanostores';

export type IBasePopup = 'get-started' | 'none';
export const storeBasePopups = atom({
  basePopup: 'none' as IBasePopup,
});

export function setBasePopup(popup: IBasePopup) {
  storeBasePopups.set({
    ...storeBasePopups.get(),
    basePopup: popup,
  });
}

export function getBasePopup() {
  return storeBasePopups.get().basePopup;
}
