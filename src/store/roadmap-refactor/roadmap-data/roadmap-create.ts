import { atom } from 'nanostores';
import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/params-base-roadmap';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export const roadmapCreate = atom(deepCopy(emptyRoadmap));

export const setRoadmapCreate = (roadmap: IRoadmap) => {
  roadmapCreate.set({ ...roadmap });
  roadmapSelector.set({ ...roadmap });
};

export const getRoadmapCreate = () => {
  return roadmapCreate.get();
};

export const resetRoadmapCreate = () => {
  setRoadmapCreate(emptyRoadmap);
};
