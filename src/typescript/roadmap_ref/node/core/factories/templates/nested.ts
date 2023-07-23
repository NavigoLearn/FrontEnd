import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import {
  injectNestedFlags,
  injectNestedNodeData,
  injectNewId,
} from '@typescript/roadmap_ref/node/core/factories/injectors/inject';

export function NodeFactoryNested(nestedWithinId: string): NodeClass {
  // return boilerplate class for nested node
  const node = new NodeClass();
  injectNestedFlags(node);
  injectNewId(node);
  injectNestedNodeData(node, nestedWithinId);

  return node;
}
