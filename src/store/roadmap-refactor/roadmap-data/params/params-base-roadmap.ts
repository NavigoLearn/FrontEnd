import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';

export const emptyRoadmap: IRoadmap = {
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
  data: {
    globalRootNodeId: '0',
    colorTheme: 'winterTheme',
  },
  templates: {},
};

export type IVersions = '1.0.0' | '1.0.1';

type IBacklog = {
  version: IVersions;
  changes: string;
  date: string;
  status: string;
};

const ROADMAP_VERSIONS_BACKLOG: IBacklog[] = [
  {
    version: '1.0.1',
    changes: 'Added fill-opacity to the roadmap nodes',
    date: '18 sept 2023',
    status: 'patched in nodeRenderer with a default value',
  },
];

export const ROADMAP_CURRENT_VERSION: IVersions = '1.0.1';
