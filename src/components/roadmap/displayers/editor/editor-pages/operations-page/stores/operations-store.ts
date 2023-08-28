import { atom } from 'nanostores';

type IDropdowns = 'add-child' | 'apply-template' | 'none';
export const operationsStore = atom({
  dropdown: 'none' as IDropdowns,
} as {
  dropdown: IDropdowns;
});

export const setOperationsDropdown = (dropdown: IDropdowns) => {
  operationsStore.set({
    dropdown,
  });
};
