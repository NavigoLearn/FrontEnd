import { setShift } from '@store/roadmap-refactor/misc/key-press-store';

export function addKeyListeners() {
  document.addEventListener('keydown', function (event) {
    if (event.shiftKey) {
      setShift(true);
    }
  });

  document.addEventListener('keyup', function (event) {
    if (!event.shiftKey) {
      setShift(false);
    }
  });
}
