import { atom } from 'nanostores';

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
  if (draggable !== originalDraggables.draggableElements[id]) {
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

export default draggableElements;
