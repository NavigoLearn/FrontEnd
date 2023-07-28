import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectDraggingBehavior,
  injectNestedFlags,
  injectNestedNodeData,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import { draggingBehaviorFactorySubNode } from '@src/typescript/roadmap_ref/dragging/factories';

export function nodeFactorySubNode(nestedWithinId: string): NodeClass {
  // return boilerplate class for nested node
  const node = new NodeClass();
  injectNestedFlags(node);
  injectNewRandomId(node);
  injectNestedNodeData(node, nestedWithinId);

  const draggingBehavior = draggingBehaviorFactorySubNode(node.id);
  injectDraggingBehavior(node, draggingBehavior);

  return node;
}
