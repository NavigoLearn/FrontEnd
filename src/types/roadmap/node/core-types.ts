export type IPropertiesKeys =
  | 'parentId'
  | 'childrenIds'
  | 'nestedWithin'
  | 'chunkId';

export interface IPropertisKeyFields {
  parentId: string;
  childrenIds: string[];
  nestedWithin: string;
  chunkId: string;
}

export interface IIdentifiers {
  id: string; // unique
  name: string; // not unique, editable by user
}

export type INodeProperties = {
  [key in IPropertiesKeys]: IPropertisKeyFields[key];
};
