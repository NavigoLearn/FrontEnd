import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';

export function setLoadedTrue() {
  const original = roadmapState.get();
  roadmapState.set({ ...original, loaded: true });
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
