import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { IComponentObject } from '@type/roadmap/node/components-types';

export function appendAttachment(
  node: NodeClass,
  attachment: IAttachmentObject
): void {
  node.attachments.push(attachment);
  // gets actions and appends them to the node
}

export function appendComponent(
  node: NodeClass,
  component: IComponentObject
): void {
  node.components.push(component);
}

export function appendNestedNode(node: NodeClass, id: string) {
  node.nestedNodesIds.push(id);
}
