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

export type INodeProperties = {
  [key in IPropertiesKeys]: IPropertisKeyFields[key];
};
