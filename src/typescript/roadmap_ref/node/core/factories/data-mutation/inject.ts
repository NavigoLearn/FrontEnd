// file containing different data-mutation for some properties-page of the node

import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { generateId } from '@src/typescript/roadmap_ref/node/core/misc';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';

export function injectClassicFlags(node: NodeClass) {
  node.flags.chunkFlag = true;
  node.flags.connFlag = true;
  node.flags.connectionPivotFlag = true;
  node.flags.markAsDoneBehaviorFlag = true;
  node.flags.renderedOnRoadmapFlag = true;
}

export function injectNestedFlag(node: NodeClass) {
  node.flags.subNodeFlag = true;
}

export function injectParentData(node: NodeClass, parent: string) {
  node.properties.parentId = parent;
}

export function injectChildrenData(node: NodeClass, children: string[]) {
  node.properties.childrenIds = children;
}
export function injectNestedWithinData(node: NodeClass, nestedWithin: string) {
  node.properties.nestedWithin = nestedWithin;
}

export function injectChunkData(node: NodeClass, chunks: string[]) {
  node.properties.chunksIds = chunks;
}

export function injectClassicData(node: NodeClass, parent, children) {
  injectParentData(node, parent);
  injectChildrenData(node, children);
  injectChunkData(node, []);
}

export function injectNestedFlags(node: NodeClass) {
  injectNestedFlag(node);
}

export function injectNestedNodeData(node: NodeClass, nestedWithin: string) {
  injectNestedWithinData(node, nestedWithin);
}

export function injectRenderedOnRoadmapFlag(node: NodeClass) {
  node.flags.renderedOnRoadmapFlag = true;
}

export function injectNewId(node: NodeClass, newId: string): string {
  node.id = newId;
  return node.id;
}
export function injectNewRandomId(node: NodeClass): string {
  node.id = generateId();
  return node.id;
}

export function injectDraggingBehavior(
  node: NodeClass,
  draggingBehavior: DraggingBehavior
) {
  node.draggingBehavior = draggingBehavior;
}
