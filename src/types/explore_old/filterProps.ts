export type FilterManagerProps = {
  onChange: (fieldDropDown: string, option: string) => void;
  value: { [key: string]: string }; // value should be an object with string values
  handleClick: (stateVar: 'sort' | 'filter') => void;
  onSave: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
