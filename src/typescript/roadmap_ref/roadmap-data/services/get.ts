import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export const getNodeByIdRoadmapSelector = (id: string) => {
  return roadmapSelector.get().nodes[id];
};
export function tracebackNodeToRoot(nodeId: string) {
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
