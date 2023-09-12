export type IPropertiesKeys =
  | 'parentId'
  | 'childrenIds'
  | 'nestedWithin'
  | 'chunksIds'
  | 'markAsDone';

export interface IPropertisKeyFields {
  parentId: string;
  childrenIds: string[];
  nestedWithin: string;
  chunksIds: string[];
  markAsDone: boolean;
}

export type INodeProperties = {
  [key in IPropertiesKeys]: IPropertisKeyFields[key];
};
