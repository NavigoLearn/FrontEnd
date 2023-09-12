import { atom } from 'nanostores';
import { getTriggerTooltip } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

const keyPressStore = atom({
  shift: false,
} as {
  shift: boolean;
});

export function setShift(shift: boolean) {
  const originalShift = keyPressStore.get();
  if (shift !== originalShift.shift) {
    keyPressStore.set({ ...originalShift, shift });
  }
}

export function getShift() {
  return keyPressStore.get().shift;
}

export default keyPressStore;
