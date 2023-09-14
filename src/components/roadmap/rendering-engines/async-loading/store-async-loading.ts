import { atom } from 'nanostores';

export const storeRenderingEngine = atom({
  asyncDelay: 0,
  timeout: null,
} as {
  asyncDelay: number;
  timeout: any;
});

const BASE_DELAY = 10;
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
  }, 500);
  storeRenderingEngine.get().timeout = timeout;
}

export const getAsyncDelayNoSideEffects = () => {
  return storeRenderingEngine.get().asyncDelay;
};

export const getAsyncDelay = () => {
  storeRenderingEngine.get().asyncDelay += BASE_DELAY;
  resetAsyncDelay();
  return storeRenderingEngine.get().asyncDelay;
};

export const decrementAsyncDelay = () => {
  const currentDelay = storeRenderingEngine.get().asyncDelay;
  if (currentDelay < 0) {
    storeRenderingEngine.get().asyncDelay = 0;
  } else {
    storeRenderingEngine.get().asyncDelay -= BASE_DELAY;
  }
  console.log('asyncDelay at decrement', storeRenderingEngine.get().asyncDelay);
};
