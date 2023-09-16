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
