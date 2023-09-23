import { factoryNodeClassic } from '@src/typescript/roadmap_ref/node/core/factories/base-templates-factories/classic';
import {
  type INodeTemplates,
  NodeClass,
} from '@src/typescript/roadmap_ref/node/core/core';
import { transferNodeTemplateToNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/protocol';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { triggerAllConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';

export const applyNodeTemplate = (
  node: NodeClass,
  template: INodeTemplates
) => {
  let newNode;
  if (template === 'classic') {
    newNode = factoryNodeClassic(node.id);
  }
  transferNodeTemplateToNode(node, newNode);
  triggerNodeRerender(node.id);
  triggerAllConnectionsRerender();
};
