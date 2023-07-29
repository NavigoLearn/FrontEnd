import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

export const roadmapEdit = atom({} as Roadmap);

export const getNodeByIdRoadmapEdit = (id: string) => {
  return roadmapEdit.get().nodes[id];
};

export const setRoadmapEdit = (roadmap: Roadmap) => {
  roadmapEdit.set({ ...roadmap });
};
