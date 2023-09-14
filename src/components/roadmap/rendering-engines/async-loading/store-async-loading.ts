import { atom } from 'nanostores';

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
    console.log(
      'resetting asyncDelay _______________________',
      storeRenderingEngine.get().asyncDelay
    );
    storeRenderingEngine.set({
      asyncDelay: 0,
      timeout: null,
    });
  }, 1000);
  storeRenderingEngine.get().timeout = timeout;
}

export const getAsyncDelayNoSideEffects = () => {
  return storeRenderingEngine.get().asyncDelay;
};

export const getAsyncDelay = () => {
  storeRenderingEngine.get().asyncDelay += 15;
  console.log('asyncDelay', storeRenderingEngine.get().asyncDelay);
  resetAsyncDelay();
  return storeRenderingEngine.get().asyncDelay;
};

export const decrementAsyncDelay = () => {
  storeRenderingEngine.get().asyncDelay -= 15;
  console.log('asyncDelay at decrement', storeRenderingEngine.get().asyncDelay);
};
