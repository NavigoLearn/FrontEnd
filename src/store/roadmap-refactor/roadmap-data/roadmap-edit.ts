import { atom } from 'nanostores';
import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/params-base-roadmap';
import { type IRoadmapApi } from '@type/explore_old/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export const roadmapEdit = atom(deepCopy(emptyRoadmap));

export const setRoadmapEditStore = (roadmap: IRoadmap) => {
  roadmapSelector.set({ ...roadmap });
  roadmapEdit.set({ ...roadmap });
};

export const getRoadmapEdit = () => {
  return roadmapEdit.get();
};

export function setRoadmapEditFromAPI(roadmapData: IRoadmapApi) {
  if (isRoadmapType(roadmapData.data)) {
    // @ts-ignore
    const roadmap: IRoadmap = roadmapData.data;
    // @ts-ignore
    roadmap.data = roadmapData.miscData;
    setRoadmapEditStore(roadmap);
  } else {
    throw new Error('Roadmap roadmap-roadmap-data is not of type Roadmap');
  }
}
