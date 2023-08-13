import { atom } from 'nanostores';

const draggingOffset = atom({
  x: 0,
  y: 0,
} as {
  x: number;
  y: number;
});

export function setDraggingOffset(x: number, y: number) {
  draggingOffset.set({
    x,
    y,
  });
}

export function getDraggingOffset() {
  return draggingOffset.get();
}
