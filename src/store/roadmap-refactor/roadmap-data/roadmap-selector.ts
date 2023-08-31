import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';

export const roadmapSelector = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
  data: {
    colorTheme: 'defaultTheme',
  },
  templates: {},
} as IRoadmap);

export const getRoadmapSelector = () => {
    return roadmapSelector.get();
}

export const setRoadmapSelector = (roadmap: IRoadmap) => {
  roadmapSelector.set({ ...roadmap });
};
