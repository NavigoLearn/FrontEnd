import { atom } from 'nanostores';

const scaleSafariStore = atom({
  scale: 1,
} as any);

export function setScaleSafari(scale: number) {
  const originalViewport = scaleSafariStore.get();
  if (scale !== originalViewport.scale) {
    scaleSafariStore.set({ ...originalViewport, scale });
  }
}

export function getScaleSafari() {
  return scaleSafariStore.get().scale;
}
export default scaleSafariStore;
