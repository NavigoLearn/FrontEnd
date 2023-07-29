export function afterEventLoop(callback: () => void) {
  setTimeout(callback, 0);
}
