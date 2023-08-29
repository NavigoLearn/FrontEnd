import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export const roadmapEdit = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
} as IRoadmap);

export const setRoadmapEdit = (roadmap: IRoadmap) => {
  roadmapSelector.set({ ...roadmap });
  roadmapEdit.set({ ...roadmap });
};
