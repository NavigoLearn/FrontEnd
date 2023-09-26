import { v4 as uuidv4 } from 'uuid';

export function afterEventLoop(callback: () => void) {
  setTimeout(callback, 0);
}

export function getRandomId() {
  return uuidv4();
}

// Thanks to https://stackoverflow.com/a/30106551
// Decoding base64 ⇢ UTF-8
export function decodeBase64(str: string) {
  if (typeof Buffer !== 'undefined')
    return Buffer.from(str, 'base64').toString();

  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );
}

// Encoding UTF-8 ⇢ base64
export function encodeBase64(str: string) {
  if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');

  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}
