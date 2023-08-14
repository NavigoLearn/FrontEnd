import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

export const roadmapSelector = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
  data: {
    colorTheme: 'defaultTheme',
  },
} as Roadmap);

export const setRoadmapSelector = (roadmap: Roadmap) => {
  roadmapSelector.set({ ...roadmap });
};
