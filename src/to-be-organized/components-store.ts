import { atom } from 'nanostores';

export const lastOpacity = atom<number>(0);

export function setLastOpacity(opacity: number) {
  lastOpacity.set(opacity);
}

export function getLastOpacity() {
  return lastOpacity.get();
}
