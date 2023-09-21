import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IColorThemesOptions } from '@type/roadmap/node/colors-types';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import { TemplateNode } from '@src/typescript/roadmap_ref/node/templates-system/template-core';
import { type HashMap } from '@type/roadmap/misc';

export type IRoadmapData = {
  colorTheme: IColorThemesOptions;
  globalRootNodeId: string;
};

export type IRoadmap = {
  rootNodesIds: string[]; // list of ids of the nodes-page in the roadmap at initial rendering (so not subNodes)
  nodes: HashMap<NodeClass>;
  connections: HashMap<ConnectionClass>; // needs to be created
  chunks: HashMap<string[]>; // ids of the nodes-page in each chunk
  data: IRoadmapData;
  templates: HashMap<TemplateNode>;
};
