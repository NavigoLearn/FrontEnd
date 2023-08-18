import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';

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
