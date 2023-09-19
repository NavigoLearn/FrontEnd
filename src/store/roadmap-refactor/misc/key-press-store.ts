import { atom } from 'nanostores';
import { getTriggerTooltip } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { undoEvent } from '@src/to-be-organized/undo-redo/undo-operations';

type IKeyPressOptions = 'shift' | 'alt' | 'ctrl' | 'ctrl+z';

type ICallback = () => void;

const DEFAULT_IMMUTABLE_SUBSCRIBERS: Record<IKeyPressOptions, ICallback[]> = {
  shift: [],
  alt: [],
  ctrl: [],
  'ctrl+z': [undoEvent],
};

const storeKeyPress = atom({
  shift: false,
  alt: false,
  ctrl: false,
  'ctrl+z': false,
} as Record<IKeyPressOptions, boolean>);
export default storeKeyPress;
const storeKeyPressSubscribers = atom({
  shift: [],
  alt: [],
  ctrl: [],
  'ctrl+z': [],
} as Record<IKeyPressOptions, ICallback[]>);

export function subscribeToShift(callback: () => void) {
  const store = storeKeyPressSubscribers.get();
  store.shift.push(callback);
  storeKeyPressSubscribers.set({ ...store });
}

export function subscribeToAlt(callback: () => void) {
  const store = storeKeyPressSubscribers.get();
  store.alt.push(callback);
  storeKeyPressSubscribers.set({ ...store });
}

export function triggerShiftSubscribers() {
  const { shift } = storeKeyPressSubscribers.get();
  shift.forEach((callback) => callback());
}

export function triggerAltSubscribers() {
  const { alt } = storeKeyPressSubscribers.get();
  alt.forEach((callback) => callback());
}

export function setShift(shift: boolean) {
  const originalShift = storeKeyPress.get();
  if (shift !== originalShift.shift) {
    storeKeyPress.set({ ...originalShift, shift });
    triggerShiftSubscribers();
  }
}

export function getShift() {
  return storeKeyPress.get().shift;
}

export function setAlt(alt: boolean) {
  const originalAlt = storeKeyPress.get();
  if (alt !== originalAlt.alt) {
    storeKeyPress.set({ ...originalAlt, alt });
    triggerAltSubscribers();
  }
}

export function getAlt() {
  return storeKeyPress.get().alt;
}

export function unSubscribeToAlt(callback: () => void) {
  const store = storeKeyPressSubscribers.get();
  store.alt = store.alt.filter((cb) => cb !== callback);

  storeKeyPressSubscribers.set({
    ...store,
  });
}

export function unSubscribeToShift(callback: () => void) {
  const store = storeKeyPressSubscribers.get();
  store.shift = store.shift.filter((cb) => cb !== callback);

  storeKeyPressSubscribers.set({
    ...store,
  });
}

export function subscribeToKey(key: IKeyPressOptions, callback: () => void) {
  const store = storeKeyPressSubscribers.get();
  store[key].push(callback);
  storeKeyPressSubscribers.set({ ...store });
}

export function unSubscribeToKey(key: IKeyPressOptions, callback: () => void) {
  const store = storeKeyPressSubscribers.get();
  store[key] = store[key].filter((cb) => cb !== callback);

  storeKeyPressSubscribers.set({
    ...store,
  });
}

export function setKey(key: IKeyPressOptions, value: boolean) {
  const original = storeKeyPress.get();
  if (value !== original[key]) {
    storeKeyPress.set({ ...original, [key]: value });
    const subscribers = storeKeyPressSubscribers.get();
    subscribers[key].forEach((callback) => callback());
    // calls default subscribers too
    DEFAULT_IMMUTABLE_SUBSCRIBERS[key].forEach((callback) => callback());
  }
}
