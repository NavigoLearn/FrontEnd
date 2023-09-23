import {
  getIsRenderedOnRoadmap,
  getNodeByIdRoadmapSelector,
  getRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { getRenderedRootNodesIds } from '@store/roadmap-refactor/render/rendered-nodes';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export const getChildrenRenderedTraceback = (nodeId: string) => {
  // only gets rendered children
  const traceback = [];
  const queue = [nodeId];
  while (queue.length > 0) {
    const currentNodeId = queue.shift();
    traceback.push(currentNodeId);
    const currentNode = getNodeByIdRoadmapSelector(currentNodeId);
    currentNode.properties.childrenIds.forEach((childId) => {
      if (getIsRenderedOnRoadmap(childId)) {
        queue.push(childId);
      }
    });
  }
  return traceback;
};

export const getAllSubNodes = (nodeId: string) => {
  const traceback = [];
  const queue = [nodeId];
  while (queue.length > 0) {
    const currentNodeId = queue.shift();
    traceback.push(currentNodeId);
    const currentNode = getNodeByIdRoadmapSelector(currentNodeId);
    currentNode.subNodeIds.forEach((childId) => {
      queue.push(childId);
    });
  }
  return traceback;
};

export const getAllRenderedNodes = () => {
  const roadmap = getRoadmapSelector();
  const nodesIds = getRenderedRootNodesIds();
  const allNodesIds = [];
  nodesIds.forEach((nodeId) => {
    allNodesIds.push(...getAllSubNodes(nodeId));
  });
  const nodes: NodeClass[] = allNodesIds.map((nodeId) => roadmap.nodes[nodeId]);
  return nodes;
};
