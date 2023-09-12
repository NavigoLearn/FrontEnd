import { atom } from 'nanostores';

const displayTitles = atom({
  displayTitles: true,
  timeout: null,
} as {
  displayTitles: boolean;
  timeout: NodeJS.Timeout | null;
});

export function setDisplayTitles(value: boolean) {
  const original = displayTitles.get();
  displayTitles.set({ ...original, displayTitles: value });
}

export function startCountdown() {
  const original = displayTitles.get();
  if (original.timeout) {
    clearTimeout(original.timeout);
  }
  const timeout = setTimeout(() => {
    setDisplayTitles(true);
  }, 500);
  displayTitles.set({ ...original, timeout });
}

export function setDisplayTitlesFalse() {
  setDisplayTitles(false);
  startCountdown();
}

export default displayTitles;
