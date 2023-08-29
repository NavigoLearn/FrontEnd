import {
  setConfirmCancel,
  setConfirmSave,
} from '@store/roadmap-refactor/popups/popup';

export const buttonsEdit = [
  {
    name: 'Save',
    callback: async () => {
      setConfirmSave();
    },
  },
  {
    name: 'Cancel Changes',
    callback: async () => {
      setConfirmCancel();
    },
  },
];
