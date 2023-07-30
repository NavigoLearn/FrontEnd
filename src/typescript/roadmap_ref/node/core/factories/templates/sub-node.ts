import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectDraggingBehavior,
  injectNestedFlags,
  injectNestedNodeData,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import { draggingBehaviorFactorySubNode } from '@src/typescript/roadmap_ref/dragging/factories';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';

export function nodeFactorySubNodeBoilerplate(
  nestedWithinId: string
): NodeClass {
  // return boilerplate class for nested node
  const node = new NodeClass();
  injectNestedFlags(node);
  injectNewRandomId(node);
  injectNestedNodeData(node, nestedWithinId);

  const draggingBehavior = draggingBehaviorFactorySubNode(node.id);
  injectDraggingBehavior(node, draggingBehavior);

  return node;
}
export function nodeFactorySubNode(
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
  // gets roadmap and appends the subnode
  return node;
}
