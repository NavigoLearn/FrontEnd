import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import {
  injectDraggingElementId,
  injectDraggingElementType,
  injectDraggingParentNodeId,
  injectDraggingStrategy,
} from '@src/typescript/roadmap_ref/dragging/inject';

export function draggingBehaviorFactoryRoadmapNode(
  nodeId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'snap');
  injectDraggingElementType(draggingBehavior, 'node');

  return draggingBehavior;
}

export function draggingBehaviorFactorySubNode(
  nodeId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'free');
  injectDraggingElementType(draggingBehavior, 'subNode');

  return draggingBehavior;
}

export function draggingBehaviorFactoryComponents(
  nodeId: string,
  componentId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementId(draggingBehavior, componentId);
  injectDraggingStrategy(draggingBehavior, 'free');
  injectDraggingElementType(draggingBehavior, 'component');
  injectDraggingParentNodeId(draggingBehavior, nodeId);

  return draggingBehavior;
}
