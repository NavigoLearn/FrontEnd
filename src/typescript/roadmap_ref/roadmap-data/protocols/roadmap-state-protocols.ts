import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { setRoadmapEditStore } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import {
  getRoadmapView,
  setRoadmapViewStore,
} from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import {
  getRoadmapSelector,
  roadmapSelector,
  setRoadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import {
  setAllDraggableFalse,
  setAllDraggableTrue,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { removeAllEffects } from '@store/roadmap-refactor/elements-editing/store-node-effects';
import { fetchUpdateRoadmapData } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import { setRoadmapState } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { getRoadmapViews } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics';

export function enterEditingModeProtocol() {
  const deepCopyRoadmap = deepCopy(roadmapSelector.get()); // performance paint point
  setRoadmapEditStore(deepCopyRoadmap);
  setDisplayPageType('closed');
  setRoadmapState('edit');
  setAllDraggableTrue(); // performance paint point
}

export function transferEditToRoadmap() {
  const deepCopyRoadmap = deepCopy(roadmapSelector.get());
  // sends the roadmap as update to the server
  setRoadmapViewStore(deepCopyRoadmap);
  setRoadmapSelector(deepCopyRoadmap); // so they have the same reference
}
export function cancelEditingProtocol() {
  // does not transfer changes from elements-editing roadmap to real roadmap
  const roadmapView = getRoadmapView();
  setRoadmapSelector(roadmapView);
  setRoadmapState('view');
  fetchUpdateRoadmapData(roadmapView); // sends the roadmap as update to the server
  setAllDraggableFalse();
  triggerChunkRerender(); // we call it in order to have the correct node ids in the renderStore for nodes-page
  setDisplayPageType('closed');
  removeAllEffects();
}
export function saveEditingProtocol() {
  transferEditToRoadmap(); //  transfers the changes to the static roadmap
  setRoadmapState('view');
  fetchUpdateRoadmapData(getRoadmapSelector()); // sends the roadmap as update to the server
  setAllDraggableFalse();
  triggerChunkRerender();
  setDisplayPageType('closed');
  removeAllEffects();
  // here there should be a request to the server with the new saved roadmap json
}

export function autosaveEditingProtocol() {
  transferEditToRoadmap(); //  transfers the changes to the static roadmap
  fetchUpdateRoadmapData(roadmapSelector.get()); // sends the roadmap as update to the server
  // here there should be a request to the server with the new saved roadmap json
}

export function capStringLen(str: string, len: number) {
  if (str.length > len) {
    return `${str.slice(0, len)}`;
  }
  return str;
}
