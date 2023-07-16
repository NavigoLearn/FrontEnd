export type IDataKeys = 'parent' | 'children' | 'nestedWithin';

export interface IDataKeysFields {
  parent: string;
  children: string[];
  nestedWithin: string;
}

export interface IIdentifiers {
  id: string; // unique
  name: string; // not unique, editable by user
}
