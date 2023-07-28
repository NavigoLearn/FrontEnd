import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/old/roadmap';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { setLoadedTrue } from '@src/typescript/roadmap/utils';
import miscParams from '@store/roadmap-refactor/misc/miscParams';
import { RoadmapTypeApi } from '@type/explore/card';
import { isRoadmapType } from '@type/roadmap/old/typecheckers';
import { setRoadmap } from '@src/typescript/roadmap/roadmap-edit-logic';
import { generateInitialEditCreate } from '@store/roadmap/data/roadmap_edit';
import {
  setOwnerId,
  setRoadmapId,
} from '@store/roadmap/data/roadmap-visit-data';
import { setIsCreateTrue } from '@store/roadmap/data/roadmap_state';
import { setTabAboutFromApi } from '@store/roadmap/data/about';
import { fetchRoadmap } from '../../../api-wrapper/roadmap/roadmaps';

const roadmapStatic = atom({} as Roadmap);

export function getNodeById(id: string) {
  const original = roadmapStatic.get();
  return original.nodes[id];
}

export function setRoadmapFromAPI(pageId: string) {
  fetchRoadmap(pageId).then((roadmapData: RoadmapTypeApi) => {
    if (isRoadmapType(roadmapData.data)) {
      const roadmap: Roadmap = roadmapData.data;
      roadmapStatic.set(roadmap); // sets the roadmap to its roadmap-roadmap-data
      setOwnerId(roadmapData.ownerId);
      setRoadmapId(roadmapData.id);
      setTabAboutFromApi(roadmapData);
      setLoadedTrue();
      triggerChunkRerender();
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

export default roadmapStatic;
