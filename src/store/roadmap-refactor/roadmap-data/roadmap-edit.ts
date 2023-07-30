import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export const roadmapEdit = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
} as Roadmap);

export const getNodeByIdRoadmapEdit = (id: string) => {
  return roadmapEdit.get().nodes[id];
};

export const setRoadmapEdit = (roadmap: Roadmap) => {
  roadmapEdit.set({ ...roadmap });
  roadmapSelector.set({ ...roadmap });
};

export const getRootNodesIds = () => {
  return roadmapEdit.get().rootNodesIds;
};
