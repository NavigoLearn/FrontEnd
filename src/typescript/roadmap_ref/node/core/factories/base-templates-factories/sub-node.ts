import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectDraggingBehavior,
  injectNestedFlags,
  injectNestedNodeData,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';
import { draggingBehaviorFactorySubNode } from '@src/typescript/roadmap_ref/dragging/factories';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { recalculateNodeCenter } from '@src/typescript/roadmap_ref/node/core/calculations/general';
import { appendAttachmentTabStandard } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/append';
import { injectDraggingStrategy } from '@src/typescript/roadmap_ref/dragging/inject';

export function nodeFactorySubNodeBoilerplate(
  nestedWithinId: string
): NodeClass {
  // return boilerplate class for nested node
  const node = new NodeClass();
  injectNestedFlags(node);
  injectNewRandomId(node);
  injectNestedNodeData(node, nestedWithinId);
  appendAttachmentTabStandard(node);
  const draggingBehavior = draggingBehaviorFactorySubNode(node.id);
  injectDraggingBehavior(node, draggingBehavior);
  injectDraggingStrategy(draggingBehavior, 'snap');

  return node;
}
export function factorySubNode(
  parentId: string,
  width: number,
  height: number,
  x: number,
  y: number
): NodeClass {
  // appends a subnode to the parent node
  const node = nodeFactorySubNodeBoilerplate(parentId);
  mutateNodeWidth(node, width);
  mutateNodeHeight(node, height);
  mutateNodeCoordX(node, x);
  mutateNodeCoordY(node, y);
  recalculateNodeCenter(node);
  // gets roadmap and appends the subnode
  return node;
}
