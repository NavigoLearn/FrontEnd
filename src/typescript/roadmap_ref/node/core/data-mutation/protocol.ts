import {
  injectActions,
  injectAttachments,
  injectFlags,
  injectNodeComponents,
  injectNodeData,
  injectSubNodeIds,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/inject';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export const transferNodeTemplateToNode = (
  node: NodeClass,
  template: NodeClass
) => {
  injectNodeComponents(node, template.components);
  injectNodeData(node, template.data);
  injectSubNodeIds(node, template.subNodeIds);
  injectAttachments(node, template.attachments);
  injectActions(node, template.actions);
  injectFlags(node, template.flags);
};
