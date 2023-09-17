import { setAlt, setShift } from '@store/roadmap-refactor/misc/key-press-store';

export function addKeyListeners() {
  document.addEventListener('keydown', function (event) {
    if (event.shiftKey) {
      setShift(true);
    }
    if (event.altKey) {
      setAlt(true);
    }
  });

  document.addEventListener('keyup', function (event) {
    setShift(false);
    setAlt(false);
  });
}
