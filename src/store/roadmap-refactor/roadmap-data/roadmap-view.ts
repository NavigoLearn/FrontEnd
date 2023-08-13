import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { setRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { fetchRoadmap } from '@src/api-wrapper/roadmap/roadmaps';
import { RoadmapTypeApi } from '@type/explore/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';
import {
  setOwnerId,
  setRoadmapId,
} from '@store/roadmap/data/roadmap-visit-data';
import { setTabAboutFromApi } from '@store/roadmap/data/about';
import { setLoadedTrue } from '@src/typescript/roadmap/utils';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import miscParams from '@store/roadmap-refactor/misc/miscParams';
import { setRoadmap } from '@src/typescript/roadmap/roadmap-edit-logic';
import { generateInitialEditCreate } from '@store/roadmap/data/roadmap_edit';
import { setIsCreateTrue } from '@store/roadmap/data/roadmap_state';

export const roadmapView = atom({
  rootNodesIds: [],
  nodes: {},
  connections: {},
  chunks: {},
} as Roadmap);

export function setRoadmapView(roadmap: Roadmap) {
  setRoadmapSelector(roadmap);
  roadmapView.set({ ...roadmap });
}

export async function setRoadmapFromAPI(pageId: string) {
  await fetchRoadmap(pageId).then((roadmapData: RoadmapTypeApi) => {
    if (isRoadmapType(roadmapData.data)) {
      // @ts-ignore
      const roadmap: Roadmap = roadmapData.data;
      setRoadmapView(roadmap);

      setOwnerId(roadmapData.ownerId);
      setRoadmapId(roadmapData.id);
      setTabAboutFromApi(roadmapData);
      setLoadedTrue();

      miscParams.get().recenterRoadmap();
    } else {
      throw new Error('Roadmap roadmap-roadmap-data is not of type Roadmap');
    }
  });
}

export function initialRoadmapCreateRender() {
  setTimeout(() => {
    // allows js to run all the code on the stack before running this
    setRoadmap(generateInitialEditCreate());
    setIsCreateTrue();
    setLoadedTrue();
    triggerChunkRerender();
    miscParams.get().recenterRoadmap();
  }, 0);
}
