import { atom } from 'nanostores';
import {
  getNodeByIdRoadmapSelector,
  getRootNodesIds,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

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

export function setDraggability(allowed: boolean) {
  const originalDraggables = draggableElements.get();
  if (allowed !== originalDraggables.canBeDragged) {
    draggableElements.set({
      ...originalDraggables,
      canBeDragged: allowed,
    });
  }
}

export function getElementDraggable(id: string) {
  return draggableElements.get().draggableElements[id];
}

export function setAllDraggableFalse() {
  const originalDraggables = draggableElements.get();
  const newDraggables = {
    ...originalDraggables,
    draggableElements: {},
  };
  Object.keys(originalDraggables.draggableElements).forEach((key) => {
    setElementDraggable(key, false);
  });
  draggableElements.set(newDraggables);
}

export function setDraggableElementForNodeWithId(id: string) {
  // iterates the components and subNodes Ids and makes them draggable
  setAllDraggableFalse();
  const originalDraggables = draggableElements.get();
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
}

export function setRoadmapRootRenderDraggable() {
  setAllDraggableFalse();
  const rootNodesIds = getRootNodesIds();
  rootNodesIds.forEach((rootNodeId) => {
    setElementDraggable(rootNodeId, true);
  });
}

export default draggableElements;
