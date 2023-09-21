export function lockExit() {
  window.onbeforeunload = (event: BeforeUnloadEvent) => {
    event.returnValue = 'Are you sure you want to leave?';
    return true;
  };
}

export function unlockExit() {
  window.onbeforeunload = null;
}
