import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  draggingBehaviorFactoryComponents,
  draggingBehaviorFactoryRoadmapNode,
  draggingBehaviorFactorySubNode,
} from '@src/typescript/roadmap_ref/dragging/factories';
import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';

export function hydrateDraggingBehaviorNode(node: NodeClass) {
  const unhydratedDraggingBehavior = node.draggingBehavior;
  const elementType = unhydratedDraggingBehavior.draggingElementType;

  if (elementType === 'node')
    node.draggingBehavior = draggingBehaviorFactoryRoadmapNode(node.id);

  if (elementType === 'subNode')
    node.draggingBehavior = draggingBehaviorFactorySubNode(node.id);

  if (elementType !== 'node' && elementType !== 'subNode')
    throw new Error('dragging behavior does not have proper element type');
}

export function hydrateDraggingBehaviorComponent(component: ComponentNode) {
  const unhydratedDraggingBehavior = component.draggingBehavior;
  const elementType = unhydratedDraggingBehavior.draggingElementType;

  if (elementType === 'component')
    component.draggingBehavior = draggingBehaviorFactoryComponents(
      component.parentNodeId,
      unhydratedDraggingBehavior.draggingElementId
    );

  if (elementType !== 'component')
    throw new Error('dragging behavior does not have proper element type');
}
