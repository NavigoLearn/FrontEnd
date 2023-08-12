import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IColorThemesOptions } from '@type/roadmap/node/colors-types';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export interface HashMap<T> {
  [key: string]: T;
}

export type HashMapWithKeys<R extends string, T> = {
  [key in R]: T;
};

export type IRoadmapData = {
  colorTheme: IColorThemesOptions;
};

export type Roadmap = {
  rootNodesIds: string[]; // list of ids of the nodes in the roadmap at initial rendering (so not subNodes)
  nodes: HashMap<NodeClass>;
  connections: HashMap<ConnectionClass>; // needs to be created
  chunks: HashMap<string[]>; // ids of the nodes in each chunk
  data: IRoadmapData;
};
