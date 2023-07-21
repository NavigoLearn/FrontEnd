import { NodeClass } from '@typescript/roadmap_ref/node/core/core';

export function deleteComponentWithId(node: NodeClass, id: string) {
  node.components = node.components.filter((component) => component.id !== id);
}
export function deleteAttachmentWithId(node: NodeClass, id: string) {
  node.attachments = node.attachments.filter(
    (attachment) => attachment.id !== id
  );
}

export function deleteNestedNodeWithId(node: NodeClass, id: string) {
  node.nestedNodesIds = node.nestedNodesIds.filter((child) => child !== id);
}
