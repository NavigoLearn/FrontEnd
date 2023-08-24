import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { setDraggableElement } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';

export const inferAndSetNodeDraggability = (node: NodeClass) => {
  const { isCreate, editing } = roadmapState.get();
  if (isCreate || editing) {
    if (node.flags.renderedOnRoadmapFlag) {
      setDraggableElement(node.id, true);
    }
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
