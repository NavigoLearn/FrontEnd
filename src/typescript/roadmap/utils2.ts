import { toggleEditing } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import { deepCopy } from '@src/typescript/roadmap/utils';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { setRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import { setRoadmapView } from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { setAllDraggableFalse } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import {
  postRoadmapData,
  updateRoadmapData,
} from '../../api-wrapper/roadmap/roadmaps';

export function transferRoadmapToEdit() {
  const deepCopyRoadmap = deepCopy(roadmapSelector.get());
  setRoadmapEdit(deepCopyRoadmap);
}

export function transferEditToRoadmap() {
  const deepCopyRoadmap = deepCopy(roadmapSelector.get());
  // sends the roadmap as update to the server
  updateRoadmapData(deepCopyRoadmap);
  setRoadmapView(deepCopyRoadmap);
}
export function cancelEditingProtocol() {
  // does not transfer changes from elements-editing roadmap to real roadmap
  setAllDraggableFalse();
  toggleEditing();
  triggerChunkRerender(); // we call it in order to have the correct node ids in the renderStore for nodes
}
export function saveEditingProtocol() {
  transferEditToRoadmap(); //  transfers the changes to the static roadmap
  postRoadmapData(roadmapSelector.get()); // sends the roadmap as update to the server
  setAllDraggableFalse();
  toggleEditing();
  triggerChunkRerender();
  // here there should be a request to the server with the new saved roadmap json
}

export function capStringLen(str: string, len: number) {
  if (str.length > len) {
    return `${str.slice(0, len)}`;
  }
  return str;
}
