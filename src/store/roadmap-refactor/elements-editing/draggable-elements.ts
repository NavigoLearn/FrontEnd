import { atom } from 'nanostores';
import {
  getNodeByIdRoadmapSelector,
  getRootNodesIds,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import renderedNodes from '@store/roadmap-refactor/render/rendered-nodes';

const draggableElements = atom({
  canBeDragged: true,
  draggableElements: {},
  draggableElementsUpdateCallbacks: {}, // a list of callbacks that is called when draggability is changed
  // to reflect that changes in the Roadmap
} as {
  canBeDragged: boolean;
  draggableElements: { [key: string]: boolean };
  draggableElementsUpdateCallbacks: {
    [key: string]: (allowed: boolean) => void;
  };
});

export function setElementDraggable(id: string, draggable: boolean) {
  const originalDraggables = draggableElements.get();
  // if callback does not exist throws and error
  if (!originalDraggables.draggableElementsUpdateCallbacks[id]) {
    throw new Error(`Callback for draggable element ${id} does not exist.`);
  }
  originalDraggables.draggableElementsUpdateCallbacks[id](draggable);
  draggableElements.set({
    ...originalDraggables,
    draggableElements: {
      ...originalDraggables.draggableElements,
      [id]: draggable,
    },
  });
}

export function setElementDraggableUpdateCallback(
  id: string,
  callback: (allowed: boolean) => void
) {
  const originalDraggables = draggableElements.get();
  originalDraggables.draggableElementsUpdateCallbacks[id] = callback;
  draggableElements.set({
    ...originalDraggables,
  });
}

export function setDraggabilityAllElements(allowed: boolean) {
  const originalDraggables = draggableElements.get();
  if (allowed !== originalDraggables.canBeDragged) {
    draggableElements.set({
      ...originalDraggables,
      canBeDragged: allowed,
    });
  }
}

export function getElementIsDraggable(id: string) {
  return draggableElements.get().draggableElements[id];
}

export function setAllDraggableTrue() {
  const originalDraggables = draggableElements.get();
  Object.keys(originalDraggables.draggableElements).forEach((key) => {
    setElementDraggable(key, true);
  });
  // draggableElements.set(originalDraggables);
}
export function setAllDraggableFalse() {
  const draggableStore = draggableElements.get();
  Object.keys(draggableStore.draggableElements).forEach((key) => {
    setElementDraggable(key, false);
  });
}

export function setDraggableElementForNodeWithId(id: string) {
  // iterates the reusable-components-page and subNodes Ids and makes them draggable

  setAllDraggableFalse();
  const draggableIds = [];
  const node = getNodeByIdRoadmapSelector(id);

  node.components.forEach((component) => {
    draggableIds.push(component.id);
  });
  node.subNodeIds.forEach((subNodeId) => {
    draggableIds.push(subNodeId);
  });

  draggableIds.forEach((draggableId) => {
    setElementDraggable(draggableId, true);
  });
  setElementDraggable(id, true);
}

export function setAllComponentsDraggableFalse() {
  const renderedNodesIds = renderedNodes.get().nodesIds;
  const queue = [...renderedNodesIds];
  while (queue.length > 0) {
    const nodeId = queue.shift();
    const node = getNodeByIdRoadmapSelector(nodeId);
    node.subNodeIds.forEach((subNodeId) => {
      queue.push(subNodeId);
    });
    node.components.forEach((component) => {
      setElementDraggable(component.id, false);
    });
  }
}

export function setDefaultDraggabilitySettings() {
  setAllDraggableTrue();
  setAllComponentsDraggableFalse();
}

export default draggableElements;
