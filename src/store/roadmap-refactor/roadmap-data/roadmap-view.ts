import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import {
  setRoadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { fetchRoadmap } from '@src/api-wrapper/roadmap/roadmaps';
import { RoadmapTypeApi } from '@type/explore/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';
import {
  setOwnerId,
  setRoadmapId,
} from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';
import {
  setTabAboutFromApi,
} from '@store/roadmap-refactor/roadmap-data/roadmap-about';
import { setLoadedTrue } from '@src/typescript/roadmap_ref/utils';
import miscParams, {
  triggerRecenterRoadmap,
} from '@store/roadmap-refactor/misc/misc-params-store';
import { SaveItem } from '@src/typescript/roadmap_ref/history/restoreSession';
import {
  getRoadmapState,
  setRoadmapStateStore,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  enterEditingModeProtocol,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import {
  setRoadmapEdit,
} from '@store/roadmap-refactor/roadmap-data/roadmap-edit';

export const roadmapView = atom({
  rootNodesIds: [],
  nodes: {},
  connections: {},
  chunks: {},
} as IRoadmap);

export function setRoadmapView(roadmap: IRoadmap) {
  setRoadmapSelector(roadmap);
  roadmapView.set({ ...roadmap });
}

export function getRoadmapView() {
  return roadmapView.get();
}

export async function setRoadmapFromAPI(pageId: string) {
  await fetchRoadmap(pageId).then(setRoadmapFromData);
}

export async function setRoadmapFromData(roadmapData: RoadmapTypeApi) {
  if (isRoadmapType(roadmapData.data)) {
    // @ts-ignore
    const roadmap: IRoadmap = roadmapData.data;
    setRoadmapView(roadmap);

    setOwnerId(roadmapData.ownerId);
    setRoadmapId(roadmapData.id);
    await setTabAboutFromApi(roadmapData);
    setLoadedTrue();

    miscParams.get().recenterRoadmap();
  } else {
    throw new Error('Roadmap roadmap-roadmap-data is not of type Roadmap');
  }
}

export function setRoadmapFromRecovery(save: SaveItem) {
  const state = getRoadmapState();
  state === 'create' ? setRoadmapSelector(save.data) : setRoadmapEdit(save.data);
  setRoadmapEdit(save.data);
  setRoadmapStateStore(save.state);
  // set editing to true
  getRoadmapState() !== 'create' && enterEditingModeProtocol();
  setLoadedTrue();

  triggerRecenterRoadmap();
}
