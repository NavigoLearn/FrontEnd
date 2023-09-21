import { atom } from 'nanostores';
import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/params-base-roadmap';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export const roadmapSelector = atom(deepCopy(emptyRoadmap));

export const getRoadmapSelector = () => {
  return roadmapSelector.get();
};

export const setRoadmapSelector = (roadmap: IRoadmap) => {
  roadmapSelector.set({ ...roadmap });
};
