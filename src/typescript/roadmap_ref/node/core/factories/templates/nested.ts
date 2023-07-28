import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectNestedFlags,
  injectNestedNodeData,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';

export function nodeFactorySubNode(nestedWithinId: string): NodeClass {
  // return boilerplate class for nested node
  const node = new NodeClass();
  injectNestedFlags(node);
  injectNewRandomId(node);
  injectNestedNodeData(node, nestedWithinId);

  return node;
}
