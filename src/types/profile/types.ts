import { type RefObject } from 'react';

export type ProfileComponentProps = {
  onEdit: (value: string) => void;
  value: string;
  edit: boolean;
};

export type HOCComponentProps = {
  edit: boolean;
  originalValue: string;
  saveRequest: (valueRef: RefObject<string>) => void;
};
