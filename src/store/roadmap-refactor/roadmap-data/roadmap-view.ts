import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { setRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { RoadmapTypeApi } from '@type/explore_old/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';

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

export function setRoadmapViewFromAPI(roadmapData: RoadmapTypeApi) {
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
