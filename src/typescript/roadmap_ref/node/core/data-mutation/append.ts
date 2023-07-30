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

export function appendSubNode(node: NodeClass, id: string) {
  node.subNodeIds.push(id);
}

export function appendChunk(node: NodeClass, id: string) {
  node.properties.chunksIds.push(id);
}

export function removeChunk(node: NodeClass, id: string) {
  node.properties.chunksIds = node.properties.chunksIds.filter(
    (chunkId) => chunkId !== id
  );
}
