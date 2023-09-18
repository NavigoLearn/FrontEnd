import { atom } from 'nanostores';
import { getTriggerTooltip } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

const storeKeyPress = atom({
  shift: false,
  alt: false,
} as {
  shift: boolean;
  alt: boolean;
});

const storeKeyPressSubscribers = atom({
  shift: [] as (() => void)[],
  alt: [] as (() => void)[],
});

export function subscribeToShift(callback: () => void) {
  const { shift } = storeKeyPressSubscribers.get();
  storeKeyPressSubscribers.set({ shift: [...shift, callback], alt: [] });
}

export function subscribeToAlt(callback: () => void) {
  const { alt } = storeKeyPressSubscribers.get();
  storeKeyPressSubscribers.set({ alt: [...alt, callback], shift: [] });
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
  const { alt } = storeKeyPressSubscribers.get();
  storeKeyPressSubscribers.set({
    alt: alt.filter((cb) => cb !== callback),
    shift: [],
  });
}

export function unSubscribeToShift(callback: () => void) {
  const { shift } = storeKeyPressSubscribers.get();
  storeKeyPressSubscribers.set({
    shift: shift.filter((cb) => cb !== callback),
    alt: [],
  });
}

export default storeKeyPress;
