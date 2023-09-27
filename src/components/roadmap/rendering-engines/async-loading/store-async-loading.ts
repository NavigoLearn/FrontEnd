import { atom } from 'nanostores';

export const storeAsyncLoading = atom({
  asyncDelay: 0,
  showNode: new Map<() => void, () => void>(),
} as {
  asyncDelay: number;
  showNode: Map<() => void, () => void>;
});

function setAsyncLoadTimeout() {
  const { asyncDelay, showNode } = storeAsyncLoading.get();
  setTimeout(setAsyncLoadTimeout, asyncDelay);
  if (showNode.size !== 0) {
    const firstKey = showNode.keys().next().value;
    const node = showNode.get(firstKey);
    if (node) {
      node();
      showNode.delete(firstKey);
    }

    storeAsyncLoading.set({
      asyncDelay,
      showNode,
    });
  }
}

let started = false;

export function insertNodeToRender(setLoaded: () => void) {
  const store = storeAsyncLoading.get();

  if (!started) {
    started = true;
    setTimeout(setAsyncLoadTimeout, store.asyncDelay);
  }

  const showNode = store.showNode.set(setLoaded, setLoaded);

  storeAsyncLoading.set({ ...store, showNode });
}

export function removeNodeToRender(setLoaded: () => void) {
  const store = storeAsyncLoading.get();
  const { showNode } = store;
  showNode.delete(setLoaded);

  storeAsyncLoading.set({ ...store, showNode });
}

export function getAsyncLoadingCounter() {
  return storeAsyncLoading.get().showNode.size;
}
