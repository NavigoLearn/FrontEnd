import { atom } from 'nanostores';
import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { setRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { type IRoadmapApi } from '@type/explore_old/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';
import { emptyRoadmap } from '@store/roadmap-refactor/roadmap-data/params/params-base-roadmap';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { roadmapAdapterDecorator } from './adapter-decorator-roadmap';

export const roadmapView = atom(deepCopy(emptyRoadmap));

export function setRoadmapViewStore(roadmap: IRoadmap) {
  setRoadmapSelector(roadmap);
  roadmapView.set({ ...roadmap });
}

export const setRoadmapViewFromAPI = roadmapAdapterDecorator(
  (roadmapData: IRoadmapApi) => {
    if (isRoadmapType(roadmapData.data)) {
      // @ts-ignore
      const roadmap: IRoadmap = roadmapData.data;
      // @ts-ignore
      roadmap.data = roadmapData.miscData;
      setRoadmapViewStore(roadmap);
    } else {
      throw new Error('Roadmap roadmap-roadmap-data is not of type Roadmap');
    }
  }
);

export function getRoadmapView() {
  return roadmapView.get();
}
