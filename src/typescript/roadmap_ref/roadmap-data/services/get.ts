import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import type { TemplateNode } from '@src/typescript/roadmap_ref/node/templates-system/template-core.ts';

export const getNodeByIdRoadmapSelector = (id: string): NodeClass => {
  return roadmapSelector.get().nodes[id];
};

export function getTracebackNodeToRoot(nodeId: string) {
  const tracebackNodes = [];
  let currentNode = roadmapSelector.get().nodes[nodeId];
  while (currentNode.properties.nestedWithin) {
    tracebackNodes.push(currentNode.properties.nestedWithin);
    currentNode =
      roadmapSelector.get().nodes[currentNode.properties.nestedWithin];
  }
  return tracebackNodes;
}

export const getRootNodesIds = () => {
  return roadmapSelector.get().rootNodesIds;
};

export const getNonRootNodesIds = () => {
  // makes diff between all nodes and root nodes
  const allNodesIds = Object.keys(roadmapSelector.get().nodes);
  const rootNodesIds = getRootNodesIds();
  return allNodesIds.filter((nodeId) => !rootNodesIds.includes(nodeId));
};

export const getConnectionByIdRoadmapSelector = (id: string) => {
  return roadmapSelector.get().connections[id];
};

export const getRootGlobalId = () => {
  return roadmapSelector.get().data.globalRootNodeId;
};

export const getIsGlobalRootNode = (nodeId: string) => {
  return nodeId === getRootGlobalId();
};

export const getIsRootNode = (nodeId: string) => {
  return getRootNodesIds().includes(nodeId);
};

export const getIsRenderedOnRoadmap = (nodeId: string) => {
  const renderedNodes = renderNodesStore.get().nodesIds;
  return renderedNodes.includes(nodeId);
};

export const getNodeAdjacentNodesIds = (nodeId: string): string[] => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const parentNode = getNodeByIdRoadmapSelector(node.properties.nestedWithin);
  const parentSubNodesIds = parentNode.subNodeIds;
  return parentSubNodesIds.filter((subNodeId) => subNodeId !== nodeId);
};

export const getNodeAbsoluteCoordsCenter = (nodeId: string): ICoords => {
  // gives top left corner in absolute coords of a node
  let tracebackOffsetX = 0;
  let tracebackOffsetY = 0;
  const traceback = getTracebackNodeToRoot(nodeId);
  traceback.push(nodeId);
  // gets last element of traceback
  traceback.forEach((traceNodeId) => {
    const traceNode = getNodeByIdRoadmapSelector(traceNodeId);
    const { coords: traceCoords } = traceNode.data;
    const { x: traceX, y: traceY } = traceCoords;
    const { width: traceWidth, height: traceHeight } = traceNode.data;
    if (traceNode.flags.renderedOnRoadmapFlag) {
      tracebackOffsetX += traceX + traceWidth / 2;
      tracebackOffsetY += traceY + traceHeight / 2;
    } else {
      tracebackOffsetX += traceX;
      tracebackOffsetY += traceY;
    }
  });
  return { x: tracebackOffsetX, y: tracebackOffsetY };
};

export const getNodeCenterAbsoluteCoords = (nodeId: string) => {
  // Too lazy to delete and reimport everywhere
  const { x, y } = getNodeAbsoluteCoordsCenter(nodeId);
  return { x, y };
};

export const getRoadmapSelector = () => {
  return roadmapSelector.get();
};

export const getRoadmapTemplatesArray = (): TemplateNode[] => {
  return Object.values(roadmapSelector.get().templates);
};

export const getTemplateById = (templateId: string) => {
  return roadmapSelector.get().templates[templateId];
};
