// file containing different injectors for some properties of the node

import { IColorSchemaOptions } from '@type/roadmap/node/colors-types';
import { colorSchemas } from '@typescript/roadmap_ref/node/core/factories/params/params';
import { NodeClass } from '@typescript/roadmap_ref/node/core/core';

export function injectNodeColorScheme(
  node: NodeClass,
  selector: IColorSchemaOptions = 'default'
) {
  node.properties.color = colorSchemas[selector];
}

export function injectClassicFlags(node: NodeClass) {
  node.flags.chunkFlag = true;
  node.flags.connFlag = true;
  node.flags.connectionPivotFlag = true;
}

export function injectSubnodeFlags(node: NodeClass) {
  node.flags.nestedFlag = true;
}

export function injectParentData(node: NodeClass, parent: string) {
  node.data.parent = parent;
}

export function injectChildrenData(node: NodeClass, children: string[]) {
  node.data.children = children;
}
export function injectNestedWithinData(node: NodeClass, nestedWithin: string) {
  node.data.nestedWithin = nestedWithin;
}

export function injectClassicData(node: NodeClass, parent, children) {
  injectParentData(node, parent);
  injectChildrenData(node, children);
}
