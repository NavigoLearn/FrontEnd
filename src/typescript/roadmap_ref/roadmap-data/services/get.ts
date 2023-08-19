import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';

export const getNodeByIdRoadmapSelector = (id: string) => {
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

export const getNodeAbsoluteCoords = (nodeId: string): ICoords => {
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
    tracebackOffsetX += traceX + traceWidth / 2;
    tracebackOffsetY += traceY + traceHeight / 2;
  });
  return { x: tracebackOffsetX, y: tracebackOffsetY };
};

export const getNodeCenterAbsoluteCoords = (nodeId: string) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  if (node.flags.renderedOnRoadmapFlag) {
    // normal node
    const x = node.data.coords.x + node.data.width / 2;
    const y = node.data.coords.y + node.data.height / 2;
    return { x, y };
  }
  // nested case
  const { x, y } = getNodeAbsoluteCoords(nodeId);
  return { x, y };
};
