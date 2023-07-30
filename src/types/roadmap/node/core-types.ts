export type IPropertiesKeys =
  | 'parentId'
  | 'childrenIds'
  | 'nestedWithin'
  | 'chunksIds';

export interface IPropertisKeyFields {
  parentId: string;
  childrenIds: string[];
  nestedWithin: string;
  chunksIds: string[];
}

export interface IIdentifiers {
  id: string; // unique
  name: string; // not unique, editable by user
}

export type INodeProperties = {
  [key in IPropertiesKeys]: IPropertisKeyFields[key];
};
