import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import roadmapStatic from '@store/roadmap/data/roadmap_static';
import {
  setEditingTrue,
  toggleEditing,
} from '@typescript/roadmap/roadmap-edit-logic-decorated';
import { applyAllDiffs, emptyAllDiffs } from '@store/roadmap/cache/diff-tabs';
import { deepCopy } from '@typescript/roadmap/utils';
import { resetAllTooltips } from '@store/roadmap-refactor/misc/miscParams';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/renderedChunks';
import { updateRoadmapData } from '../../api-wrapper/roadmap/roadmaps';

export function transferRoadmapToEdit() {
  const deepCopyRoadmap = deepCopy(roadmapStatic.get());
  roadmapEdit.set({ ...deepCopyRoadmap });
}

export function transferEditToRoadmap() {
  const deepCopyRoadmap = deepCopy(roadmapEdit.get());
  // sends the roadmap as update to the server
  updateRoadmapData(deepCopyRoadmap);
  roadmapStatic.set({ ...deepCopyRoadmap });
}

export function startEditingProtocol() {
  // copies roadmap_static to elements-editing roadmap_static and sets elements-editing to true
  transferRoadmapToEdit();
  setEditingTrue();
}

export function cancelEditingProtocol() {
  // does not transfer changes from elements-editing roadmap to real roadmap
  emptyAllDiffs(); // apply all difs to the modified tab-attachment
  resetAllTooltips(); // resets tooltips at the top of the nodes to null (they are not needed anymore)
  toggleEditing();
  triggerChunkRerender(); // we call it in order to have the correct node ids in the renderStore for nodes
}
export function saveEditingProtocol() {
  transferEditToRoadmap(); //  transfers the changes to the static roadmap
  applyAllDiffs(); // apply all difs to the modified tab-attachment
  resetAllTooltips(); // resets tooltips at the top of the nodes to null (they are not needed anymore)
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
