import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

export const roadmapSelector = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
} as Roadmap);

export const getNodeByIdRoadmapSelector = (id: string) => {
  return roadmapSelector.get().nodes[id];
};

export const setRoadmapSelector = (roadmap: Roadmap) => {
  roadmapSelector.set({ ...roadmap });
};

export const getRootNodesIds = () => {
  return roadmapSelector.get().rootNodesIds;
};
