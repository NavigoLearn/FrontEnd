import { getRootNodesIds } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import { getNodeAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-element-anchors';

export function getRenderedRootNodesAnchorsPositions(excludedNodes: string[]) {
  const rootNodesIds = getRootNodesIds();
  const renderedNodes = renderNodesStore.get().nodesIds;
  const anchorsPositions = [];

  const filteredRootNodes = rootNodesIds.filter((nodeId) => {
    return renderedNodes.includes(nodeId) && !excludedNodes.includes(nodeId);
  });

  filteredRootNodes.forEach((nodeId) => {
    const anchors = getNodeAnchorsPositions(nodeId);
    anchorsPositions.push(...anchors);
  });

  return anchorsPositions;
}
