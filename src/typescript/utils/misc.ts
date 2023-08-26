import { v4 as uuidv4 } from 'uuid';

export function afterEventLoop(callback: () => void) {
  setTimeout(callback, 0);
}

export function getRandomId() {
  return uuidv4();
}
