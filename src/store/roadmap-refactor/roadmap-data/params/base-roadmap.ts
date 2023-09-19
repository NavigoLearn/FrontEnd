import { IRoadmap } from '@type/roadmap/stores/IRoadmap';

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

type IBacklog = {
  version: string;
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

const ROADMAP_CURRENT_VERSION = '1.0.1';
