// file containing different injectors for some properties of the node

import { IColorSchemaOptions } from '@type/roadmap/node/colors-types';
import { colorSchemas } from '@src/typescript/roadmap_ref/node/core/factories/params/params';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { generateId } from '@src/typescript/roadmap_ref/node/core/misc';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';

export function injectNodeColorScheme(
  node: NodeClass,
  selector: IColorSchemaOptions = 'default'
) {
  node.data.color = colorSchemas[selector];
}

export function injectClassicFlags(node: NodeClass) {
  node.flags.chunkFlag = true;
  node.flags.connFlag = true;
  node.flags.connectionPivotFlag = true;
  node.flags.markAsDoneBehaviorFlag = true;
  node.flags.renderedOnRoadmapFlag = true;
}

export function injectNestedFlag(node: NodeClass) {
  node.flags.nestedFlag = true;
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

export function injectChunkData(node: NodeClass, chunk: string) {
  node.properties.chunkId = chunk;
}

export function injectClassicData(node: NodeClass, parent, children) {
  injectParentData(node, parent);
  injectChildrenData(node, children);
  injectChunkData(node, '0_0');
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
