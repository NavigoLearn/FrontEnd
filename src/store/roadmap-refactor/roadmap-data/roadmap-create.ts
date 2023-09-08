import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/base-roadmap';

export const roadmapCreate = atom(emptyRoadmap);

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
