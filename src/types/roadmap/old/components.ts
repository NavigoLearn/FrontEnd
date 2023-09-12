import React from 'react';

export type EditingComponentNodesProps = {
  id: string;
  onSave?: () => void;
  onCancel?: () => void;
  parentId?: string;
};

export type EditingComponentBasicProps = {
  data: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
};

export type NonEditingComponentBasicProps = {
  data: string;
  setCb: () => void;
};

export type NonEditingComponentProps = {
  data?: any;
  id: string;
  setCb: () => void;
};

export type PossibleTypes = string | number;
export type WrappedComponentProps<T> = {
  onChange: (value: T) => void;
  value: T;
};

export function checkPossibleTypes(value: any): value is PossibleTypes {
  return typeof value === 'string' || typeof value === 'number';
}

export type HOCProps<T> = {
  originalValue: T;
  onChange: (value: T) => void;
};

export type StateManagerProps<T> = React.FC<WrappedComponentProps<T>>;
