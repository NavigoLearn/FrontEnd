import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { setRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export const roadmapView = atom({
  rootNodesIds: [],
  nodes: {},
  connections: {},
  chunks: {},
} as IRoadmap);

export function setRoadmapViewStore(roadmap: IRoadmap) {
  setRoadmapSelector(roadmap);
  roadmapView.set({ ...roadmap });
}
