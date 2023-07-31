import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import roadmapState from '@store/roadmap/data/roadmap_state';
import { setElementDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';

export const inferAndSetNodeDraggability = (node: NodeClass) => {
  const { isCreate, editing } = roadmapState.get();
  if (isCreate || editing) {
    if (node.flags.renderedOnRoadmapFlag) {
      setElementDraggable(node.id, true);
    }
  }
};

export const applyRoadmapDraggability = () => {
  const { isCreate, editing } = roadmapState.get();
  const roadmap = roadmapSelector.get();

  Object.values(roadmap.nodes).forEach((node) => {
    addDragabilityProtocol(node.draggingBehavior);
    // for node iterate components and add dragability
    node.components.forEach((component) => {
      addDragabilityProtocol(component.draggingBehavior);
    });
  });

  Object.values(roadmap.nodes).forEach((node) => {
    inferAndSetNodeDraggability(node);
  });
};
