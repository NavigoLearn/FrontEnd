import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/roadmap';
import { triggerChunkRerender } from '@store/runtime-roadmap/renderedChunks';
import { setLoadedTrue } from '@typescript/roadmap/utils';
import miscParams from '@store/runtime-roadmap/miscParams';
import { fetchRoadmap } from '../api-wrapper/roadmap/roadmaps';

const roadmapStatic = atom({} as Roadmap);

export function getNodeById(id: string) {
  const original = roadmapStatic.get();
  return original.nodes[id];
}

export function setRoadmapFromAPI(pageId: string) {
  fetchRoadmap(pageId).then((roadmap: Roadmap) => {
    roadmapStatic.set(roadmap);
    setLoadedTrue();
    triggerChunkRerender();
    miscParams.get().recenterRoadmap();
  });
}

export function initialRoadmapCreateRender() {
  setLoadedTrue();
  triggerChunkRerender();
  miscParams.get().recenterRoadmap();
}

export default roadmapStatic;
