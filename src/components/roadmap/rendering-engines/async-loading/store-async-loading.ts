import { atom } from 'nanostores';
import { IDraggingElementIdentifiers } from '@src/typescript/roadmap_ref/dragging/core';

export const storeRenderingEngine = atom({
  asyncDelay: 0,
  timeout: null,
} as {
  asyncDelay: number;
  timeout: any;
});

function resetAsyncDelay() {
  // clear current timeout
  const currentTimeout = storeRenderingEngine.get().timeout;
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
  const timeout = setTimeout(() => {
    storeRenderingEngine.set({
      asyncDelay: 0,
      timeout: null,
    });
  }, 100);
  storeRenderingEngine.get().timeout = timeout;
}
export const getAsyncDelay = () => {
  storeRenderingEngine.get().asyncDelay += 15;
  resetAsyncDelay();
  return storeRenderingEngine.get().asyncDelay;
};
