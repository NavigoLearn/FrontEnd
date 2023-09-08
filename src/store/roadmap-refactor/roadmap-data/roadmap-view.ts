import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { setRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { fetchRoadmap } from '@src/api-wrapper/roadmap/routes/roadmaps';
import { RoadmapTypeApi } from '@type/explore_old/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';
import { setLoadedTrue } from '@src/typescript/roadmap_ref/utils';
import miscParams, {
  triggerRecenterRoadmap,
} from '@store/roadmap-refactor/misc/misc-params-store';
import { SaveItem } from '@src/typescript/roadmap_ref/history/restoreSession';
import {
  getRoadmapState,
  setRoadmapStateStore,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { enterEditingModeProtocol } from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { setRoadmapEditStore } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';

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
    setRoadmapViewStore(roadmap);
  } else {
    throw new Error('Roadmap roadmap-roadmap-data is not of type Roadmap');
  }
}

export function setRoadmapFromRecovery(save: SaveItem) {
  const state = getRoadmapState();
  state === 'create'
    ? setRoadmapSelector(save.data)
    : setRoadmapEditStore(save.data);
  setRoadmapEditStore(save.data);
  setRoadmapStateStore(save.state);
  // set editing to true
  getRoadmapState() !== 'create' && enterEditingModeProtocol();
  setLoadedTrue();

  triggerRecenterRoadmap();
}
