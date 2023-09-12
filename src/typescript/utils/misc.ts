import { v4 as uuidv4 } from 'uuid';

export function afterEventLoop(callback: () => void) {
  setTimeout(callback, 0);
}

export function getRandomId() {
  return uuidv4();
}

export function decodeBase64(str: string) {
  return Buffer.from(str, 'base64').toString();
}

export function encodeBase64(str: string) {
  return Buffer.from(str).toString('base64');
}
