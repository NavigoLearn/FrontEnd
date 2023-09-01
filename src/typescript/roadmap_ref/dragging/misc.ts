import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import roadmapStateStore, {
  getIsCreate,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import draggableElements, {
  getElementIsDraggable,
  setElementDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { Simulate } from 'react-dom/test-utils';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { getRenderedRootNodesIds } from '@store/roadmap-refactor/render/rendered-nodes';
import {
  getAllRenderedNodes,
  getAllSubNodes,
  getChildrenRenderedTraceback,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/get';
import drag = Simulate.drag;

export const inferAndSetNodeDraggability = (node: NodeClass) => {
  const isCreate = getIsCreate();
  const editing = getIsEditing();

  if (isCreate || editing) {
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
