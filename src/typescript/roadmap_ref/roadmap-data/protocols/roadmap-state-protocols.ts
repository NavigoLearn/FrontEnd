import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { setRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import {
  roadmapView,
  setRoadmapView,
} from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import {
  roadmapSelector,
  setRoadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { setAllDraggableFalse } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { removeAllEffects } from '@store/roadmap-refactor/elements-editing/element-effects';
import { toggleRoadmapEditing } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { updateRoadmapData } from '../../../../api-wrapper/roadmap/roadmaps';

export function enterEditingModeProtocol() {
  const deepCopyRoadmap = deepCopy(roadmapSelector.get());
  setRoadmapEdit(deepCopyRoadmap);
  setDisplayPageType('closed');
  toggleRoadmapEditing();
}

export function transferEditToRoadmap() {
  const deepCopyRoadmap = deepCopy(roadmapSelector.get());
  // sends the roadmap as update to the server
  setRoadmapView(deepCopyRoadmap);
  setRoadmapSelector(deepCopyRoadmap); // so they have the same reference
}
export function cancelEditingProtocol() {
  // does not transfer changes from elements-editing roadmap to real roadmap
  setRoadmapSelector(roadmapView.get());
  toggleRoadmapEditing();
  setAllDraggableFalse();
  triggerChunkRerender(); // we call it in order to have the correct node ids in the renderStore for nodes-page
  setDisplayPageType('closed');
  removeAllEffects();
}
export function saveEditingProtocol() {
  transferEditToRoadmap(); //  transfers the changes to the static roadmap
  toggleRoadmapEditing();
  updateRoadmapData(roadmapSelector.get()); // sends the roadmap as update to the server
  setAllDraggableFalse();
  triggerChunkRerender();
  setDisplayPageType('closed');
  removeAllEffects();
  // here there should be a request to the server with the new saved roadmap json
}

export function capStringLen(str: string, len: number) {
  if (str.length > len) {
    return `${str.slice(0, len)}`;
  }
  return str;
}
