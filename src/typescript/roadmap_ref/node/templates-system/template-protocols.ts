import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  TemplateNode,
  type IRoadmapImage,
} from '@src/typescript/roadmap_ref/node/templates-system/template-core';
import { appendTemplate } from '@src/typescript/roadmap_ref/roadmap-data/services/append';
import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { getRandomId } from '@src/typescript/utils/misc';

export const factoryRoadmapImage = (node: NodeClass): IRoadmapImage => {
  const roadmapImage: IRoadmapImage = {
    nodes: {},
  };
  const roadmap = getRoadmapSelector();
  // deep copies necessary elements from roadmap to image
  const nodesIds: string[] = [];
  const queue: string[] = [node.id];
  while (queue.length > 0) {
    const nodeId = queue.shift();
    nodesIds.push(nodeId);
    const { subNodeIds } = roadmap.nodes[nodeId];
    queue.push(...subNodeIds);
  }

  nodesIds.forEach((nodeId) => {
    roadmapImage.nodes[nodeId] = deepCopy(roadmap.nodes[nodeId]);
  });

  return roadmapImage;
};

export const factoryTemplateFromNode = (node: NodeClass): TemplateNode => {
  const template: TemplateNode = new TemplateNode();
  const roadmap = factoryRoadmapImage(node);
  template.id = getRandomId();
  template.name = node.name;
  template.baseNodeId = node.id;
  template.roadmapImage = roadmap;
  return template;
};

export const addTemplateFromNode = (node: NodeClass) => {
  const template = factoryTemplateFromNode(node);
  appendTemplate(template);
};
