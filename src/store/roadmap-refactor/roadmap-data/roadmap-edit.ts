import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { roadmap1 } from '@store/roadmap-refactor/roadmap-data/dummy-data';

export const roadmapEdit = atom(roadmap1 as Roadmap);

export const getNodeByIdRoadmapEdit = (id: string) => {
  return roadmapEdit.get().nodes[id];
};
