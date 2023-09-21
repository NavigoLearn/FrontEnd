import { type IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function getAttachmentById(
  node: NodeClass,
  id: string
): IAttachmentObject {
  const index = node.attachments.findIndex(
    (attachment) => attachment.id === id
  );
  return node.attachments[index];
}

export function getAttachmentByIndex(
  node: NodeClass,
  index: number
): IAttachmentObject {
  return node.attachments[index];
}
