import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/base-roadmap';

export const roadmapSelector = atom(emptyRoadmap);

export const getRoadmapSelector = () => {
  return roadmapSelector.get();
};

export const setRoadmapSelector = (roadmap: IRoadmap) => {
  roadmapSelector.set({ ...roadmap });
};
