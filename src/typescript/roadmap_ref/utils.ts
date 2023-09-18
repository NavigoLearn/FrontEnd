import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';

export function setLoadedTrue() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, loaded: true });
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function donsole(...args) {
  // @ts-ignore
  // eslint-disable-next-line no-console
  console.log(deepCopy(...args));
}

export function clipValue(str: string, length: number) {
  return str.slice(0, length);
}

// ? Color utils
export function hexAddAlpha(hex: string, alpha: number) {
  alpha = Math.round(alpha * 255);
  const hexWithoutHash = hex.slice(1);
  const hexWithAlpha = hexWithoutHash + alpha.toString(16).padStart(2, '0');
  return `#${hexWithAlpha}`;
}
