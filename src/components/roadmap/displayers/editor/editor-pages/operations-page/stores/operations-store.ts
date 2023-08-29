import { atom } from 'nanostores';

type IDropdowns = 'add-child' | 'apply-template' | 'none';
export const operationsStore = atom({
  dropdown: 'none' as IDropdowns,
  rerender: false,
} as {
  dropdown: IDropdowns;
  rerender: boolean;
});

const checkSameDropdown = (dropdown: IDropdowns) => {
  return operationsStore.get().dropdown === dropdown;
};
export const setOperationsDropdown = (dropdown: IDropdowns) => {
  if (checkSameDropdown(dropdown)) {
    return;
  }
  operationsStore.set({ ...operationsStore.get(), dropdown });
};

export const triggerRerenderOperations = () => {
  operationsStore.set({
    ...operationsStore.get(),
    rerender: !operationsStore.get().rerender,
  });
};
