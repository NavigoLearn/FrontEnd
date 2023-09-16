import { atom } from 'nanostores';

const scaleSafariStore = atom({
  scale: 1,
  isSafari: false,
} as {
  scale: number;
  isSafari: boolean;
});

// if browser env
if (typeof window !== 'undefined') {
  scaleSafariStore.set({
    ...scaleSafariStore.get(),
    isSafari: /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent),
  });
}

export function setScaleSafariNoSideEffects(scale: number) {
  scaleSafariStore.get().scale = scale;
}

export function setScaleSafari(scale: number) {
  const originalViewport = scaleSafariStore.get();
  if (scale !== originalViewport.scale) {
    scaleSafariStore.set({ ...originalViewport, scale });
  }
}

export function getScaleSafari() {
  return scaleSafariStore.get().scale;
}

export function getIsSafari() {
  return scaleSafariStore.get().isSafari;
}

export default scaleSafariStore;
