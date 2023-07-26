import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { decoratorTriggerRerenderEditor } from '@src/typescript/roadmap_ref/node/decorators/rerenders';

export const deleteComponentWithId = decoratorTriggerRerenderEditor(
  (node: NodeClass, id: string) => {
    node.components = node.components.filter(
      (component) => component.id !== id
    );
  }
);
export function deleteAttachmentWithId(node: NodeClass, id: string) {
  node.attachments = node.attachments.filter(
    (attachment) => attachment.id !== id
  );
}

export function deleteNestedNodeWithId(node: NodeClass, id: string) {
  node.nestedNodesIds = node.nestedNodesIds.filter((child) => child !== id);
}
