import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import roadmapStateStore, {
  getIsCreate,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import draggableElements, {
  setElementDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { Simulate } from 'react-dom/test-utils';
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

export const applyRoadmapElementsDraggability = () => {
  const roadmap = roadmapSelector.get();

  Object.values(roadmap.nodes).forEach((node) => {
    addDragabilityProtocol(node.draggingBehavior);
    // for node iterate reusable-components-page and add dragability
    node.components.forEach((component) => {
      addDragabilityProtocol(component.draggingBehavior);
    });
  });

  Object.values(roadmap.nodes).forEach((node) => {
    inferAndSetNodeDraggability(node);
  });
};
