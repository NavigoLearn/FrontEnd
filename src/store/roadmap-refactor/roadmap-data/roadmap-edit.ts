import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export const roadmapEdit = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
} as Roadmap);

export const setRoadmapEdit = (roadmap: Roadmap) => {
  roadmapSelector.set({ ...roadmap });
  roadmapEdit.set({ ...roadmap });
};
