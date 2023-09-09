import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getIsEditing } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  getElementIsDraggable,
  setElementDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { getAllRenderedNodes } from '@src/typescript/roadmap_ref/roadmap-data/protocols/get';
import { getIsCreate } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

export const inferAndSetNodeDraggability = (node: NodeClass) => {
  const editing = getIsEditing();

  console.log('inferAndSetNodeDraggability', editing);
  if (editing) {
    setElementDraggable(node.id, true);
  } else {
    setElementDraggable(node.id, false);
  }
};

export const applyRoadmapElementsInitialDraggability = () => {
  const nodes = getAllRenderedNodes();

  Object.values(nodes).forEach((node) => {
    addDragabilityProtocol(node.draggingBehavior);
    // for node iterate reusable-components-page and add dragability
    node.components.forEach((component) => {
      addDragabilityProtocol(component.draggingBehavior);
    });
    inferAndSetNodeDraggability(node);
  });
};

export const applyNodesDraggability = () => {
  const nodes = getAllRenderedNodes();

  Object.values(nodes).forEach((node) => {
    const elementIsDraggable = getElementIsDraggable(node.id);
    if (typeof elementIsDraggable === 'undefined') {
      // element never existed before
      addDragabilityProtocol(node.draggingBehavior);
      node.components.forEach((component) => {
        addDragabilityProtocol(component.draggingBehavior);
      });
      inferAndSetNodeDraggability(node);
    } else {
      // element existed but was erased bcz of chunking and now it was added again
      addDragabilityProtocol(node.draggingBehavior);
      node.components.forEach((component) => {
        const componentIsDraggable = getElementIsDraggable(component.id);
        addDragabilityProtocol(component.draggingBehavior);
        setElementDraggable(component.id, componentIsDraggable);
      });
      setElementDraggable(node.id, elementIsDraggable);
    }
  });
};
