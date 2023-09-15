import { atom } from 'nanostores';

export const storeRenderingEngine = atom({
  asyncDelay: 15,
  showNode: new Map<() => void, () => void>(),
} as {
  asyncDelay: number;
  showNode: Map<() => void, () => void>;
});

function setAsyncLoadTimeout() {
  const { asyncDelay, showNode } = storeRenderingEngine.get();
  setTimeout(setAsyncLoadTimeout, asyncDelay);
  if (showNode.size !== 0) {
    const firstKey = showNode.keys().next().value;
    const node = showNode.get(firstKey);
    if (node) {
      node();
      showNode.delete(firstKey);
    }

    storeRenderingEngine.set({
      asyncDelay,
      showNode
    });
  }
}

let started = false;

export function insertNodeToRender(setLoaded: () => void) {
  const store = storeRenderingEngine.get();

  if (!started) {
    started = true;
    setTimeout(setAsyncLoadTimeout, store.asyncDelay);
  }

  const showNode = store.showNode.set(setLoaded, setLoaded);

  storeRenderingEngine.set({...store, showNode});
}

export function removeNodeToRender(setLoaded: () => void) {
  const store = storeRenderingEngine.get();
  const showNode = store.showNode;
  showNode.delete(setLoaded);

  storeRenderingEngine.set({...store, showNode});
}