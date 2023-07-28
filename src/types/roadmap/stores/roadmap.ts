import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export interface HashMap<T> {
  [key: string]: T;
}
export type Roadmap = {
  rootNodesIds: string[]; // list of ids of the nodes in the roadmap at initial rendering (so not subNodes)
  nodes: HashMap<NodeClass>;
  connections: HashMap<any>; // needs to be created
  chunks: HashMap<string[]>; // ids of the nodes in each chunk
};
