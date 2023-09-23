import {
  injectActions,
  injectAttachments,
  injectFlags,
  injectNodeComponents,
  injectNodeDataPreservingCoords,
  injectSubNodeIds,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/inject';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { deleteNodeFromChunks } from '@src/typescript/roadmap_ref/roadmap-data/services/delete';
import { recalculateNodeChunks } from '@src/typescript/roadmap_ref/node/core/calculations/general';
import { appendNodeToChunks } from '@src/typescript/roadmap_ref/roadmap-data/services/append';

export const transferNodeTemplateToNode = (
  node: NodeClass,
  template: NodeClass
) => {
  injectNodeComponents(node, template.components);
  injectNodeDataPreservingCoords(node, template.data);
  injectSubNodeIds(node, template.subNodeIds);
  injectAttachments(node, template.attachments);
  injectActions(node, template.actions);
  injectFlags(node, template.flags);
};

export const applyTemplateToNewNode = (
  node: NodeClass,
  template: NodeClass
) => {
  injectNodeComponents(node, template.components);
  injectNodeDataPreservingCoords(node, template.data);
  injectSubNodeIds(node, template.subNodeIds);
  injectAttachments(node, template.attachments);
  injectActions(node, template.actions);
  injectFlags(node, template.flags);
};

export const recalculateNodeChunksWithRoadmapSideEffects = (
  node: NodeClass
) => {
  deleteNodeFromChunks(node);
  recalculateNodeChunks(node);
  appendNodeToChunks(node);
};
