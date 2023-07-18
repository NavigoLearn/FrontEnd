import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { factoryEmptyAttachmentJSON } from '@typescript/roadmap_ref/node/attachments/tab/factory';
import { IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { IComponentObject } from '@type/roadmap/node/components-types';

export function appendEmptyTabJSON(node: NodeClass): void {
  const attachmentJSON = factoryEmptyAttachmentJSON('Tab');
  node.attachmentsJSON.push(attachmentJSON);
}

export function appendAttachmentJSON(
  node: NodeClass,
  attachmentJSON: IAttachmentObject
): void {
  node.attachmentsJSON.push(attachmentJSON);
}

export function appendComponentJSON(
  node: NodeClass,
  componentJSON: IComponentObject
): void {
  node.componentsJSON.push(componentJSON);
}

export function appendNestedNode(node: NodeClass, id: string) {
  node.nestedNodesIds.push(id);
}
