import {
  setAlt,
  setKey,
  setShift,
} from '@store/roadmap-refactor/misc/key-press-store';

export function addKeyListeners() {
  document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
      event.preventDefault();
      setShift(true);
    }
    if (event.altKey) {
      event.preventDefault();
      setAlt(true);
    }
    // ctrl z
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      setKey('ctrl+z', true);
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
      event.preventDefault();
      setShift(false);
    }
    if (event.key === 'Alt') {
      event.preventDefault();
      setAlt(false);
    }
    // ctrl z
    if (event.key === 'z') {
      event.preventDefault();
      setKey('ctrl+z', false);
    }
  });
}
