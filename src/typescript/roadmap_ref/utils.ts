import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/roadmap_state';

export function setLoadedTrue() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, loaded: true });
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function donsole(...args) {
  // @ts-ignore
  console.log(deepCopy(...args));
}
