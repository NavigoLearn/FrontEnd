import { atom } from 'nanostores';

type IDropdowns = 'add-child' | 'add-parent' | 'apply-template' | 'none';
export const operationsStore = atom({
  dropdown: 'none' as IDropdowns,
  rerender: false,
  searchQuery: '',
} as {
  dropdown: IDropdowns;
  rerender: boolean;
  searchQuery: string;
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

export const setSearchQuery = (value: string) => {
  operationsStore.set({ ...operationsStore.get(), searchQuery: value });
};

export const getSearchQuery = () => {
  return operationsStore.get().searchQuery;
};
