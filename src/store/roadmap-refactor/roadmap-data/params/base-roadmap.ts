import { IRoadmap } from '@type/roadmap/stores/IRoadmap';

export const emptyRoadmap = {
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
  data: {
    colorTheme: 'winterTheme',
  },
  templates: {},
} as IRoadmap;
