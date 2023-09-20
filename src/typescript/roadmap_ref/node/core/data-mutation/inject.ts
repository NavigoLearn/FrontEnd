import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { Data } from '@src/typescript/roadmap_ref/node/core/data';

export function injectNodeData(node: NodeClass, data: Data) {
  node.data = data;
}

export function injectNodeDataPreservingCoords(node: NodeClass, data: Data) {
  const oldData = node.data;
  node.data = data;
  node.data.coords = oldData.coords;
}

export function injectNodeComponents(node: NodeClass, components) {
  node.components = components;
}

export function injectSubNodeIds(node: NodeClass, subNodeIds: string[]) {
  node.subNodeIds = subNodeIds;
}

export function injectAttachments(node: NodeClass, attachments) {
  node.attachments = attachments;
}

export function injectActions(node: NodeClass, actions) {
  node.actions = actions;
}

export function injectDraggingBehavior(node: NodeClass, draggingBehavior) {
  node.draggingBehavior = draggingBehavior;
}

export function injectFlags(node: NodeClass, flags) {
  node.flags = flags;
}

export function injectMarkAsDoneBehaviorFlag(node: NodeClass) {
  node.flags.markAsDoneBehaviorFlag = true;
}
