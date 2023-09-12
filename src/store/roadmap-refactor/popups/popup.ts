import { atom } from 'nanostores';
import { setClickedIndex } from '@store/roadmap/sidebar/clickedState';

const popup = atom({
  type: 'none',
} as {
  type: string;
});

export function setReport() {
  const newPop = popup.get();
  // closes popup if is report
  if (newPop.type === 'report') {
    newPop.type = 'none';
    popup.set({
      ...newPop,
      type: 'none',
    });
    return;
  }
  // sets type to report
  popup.set({
    ...newPop,
    type: 'report',
  });
}

export function setTypeNone() {
  setClickedIndex(-1);
  popup.set({
    type: 'none',
  });
}

export function setConfirmDelete() {
  const newPop = popup.get();
  // closes popup if is confirm save
  if (newPop.type === 'confirmDelete') {
    setTypeNone();
    return;
  }
  // sets type to confirm save
  popup.set({
    ...newPop,
    type: 'confirmDelete',
  });
}
export function setConfirmSave() {
  const newPop = popup.get();
  // closes popup if is confirm save
  if (newPop.type === 'confirmSave') {
    setTypeNone();
    return;
  }
  // sets type to confirm save
  popup.set({
    ...newPop,
    type: 'confirmSave',
  });
}

export function setConfirmCancel() {
  const newPop = popup.get();
  // closes popup if is confirm cancel
  if (newPop.type === 'confirmCancel') {
    setTypeNone();
    return;
  }
  // sets type to confirm cancel
  popup.set({
    ...newPop,
    type: 'confirmCancel',
  });
}

export default popup;
