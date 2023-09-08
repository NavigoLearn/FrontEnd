import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/base-roadmap';

export const roadmapEdit = atom(emptyRoadmap);

export const setRoadmapEdit = (roadmap: IRoadmap) => {
  roadmapSelector.set({ ...roadmap });
  roadmapEdit.set({ ...roadmap });
};

export const getRoadmapEdit = () => {
  return roadmapEdit.get();
};

export const resetRoadmapEdit = () => {
  setRoadmapEdit(emptyRoadmap);
};
