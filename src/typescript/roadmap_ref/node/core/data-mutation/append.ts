import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { type IComponentObject } from '@type/roadmap/node/components-types';
import { appendAction } from '@src/typescript/roadmap_ref/node/core/actions/append';

export function appendAttachment(
  node: NodeClass,
  attachment: IAttachmentObject
): void {
  node.attachments.push(attachment);
  // gets operations-page and appends them to the node
  appendAction(node, 'Open attachment');
}

export function appendComponent(
  node: NodeClass,
  component: IComponentObject
): void {
  node.components.push(component);
}

export function appendSubNodeId(node: NodeClass, id: string) {
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

export function appendChildNodeId(node: NodeClass, id: string) {
  node.properties.childrenIds.push(id);
}

export function appendConnectionNode(node: NodeClass, id: string) {
  node.connections.push(id);
}
