import { factoryNodeClassic } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import {
  INodeTemplates,
  NodeClass,
} from '@src/typescript/roadmap_ref/node/core/core';
import { transferNodeTemplateToNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/protocol';

export const applyNodeTemplate = (
  node: NodeClass,
  template: INodeTemplates
) => {
  let newNode;
  if (template === 'classic') {
    newNode = factoryNodeClassic(node.id);
  }
  console.log('applied template');
  transferNodeTemplateToNode(node, newNode);
};
