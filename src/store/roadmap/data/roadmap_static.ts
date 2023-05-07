import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/roadmap';
import { triggerChunkRerender } from '@store/roadmap/render/renderedChunks';
import { setLoadedTrue } from '@typescript/roadmap/utils';
import miscParams from '@store/roadmap/misc/miscParams';
import { RoadmapTypeApi } from '@type/explore/card';
import { isRoadmapType } from '@type/roadmap/typecheckers';
import { setRoadmap } from '@typescript/roadmap/roadmap-edit-logic';
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
      roadmapStatic.set(roadmap); // sets the roadmap to its data
      setOwnerId(roadmapData.ownerId);
      setRoadmapId(roadmapData.id);
      setTabAboutFromApi(roadmapData);
      setLoadedTrue();
      triggerChunkRerender();
      miscParams.get().recenterRoadmap();
    } else {
      throw new Error('Roadmap data is not of type Roadmap');
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
