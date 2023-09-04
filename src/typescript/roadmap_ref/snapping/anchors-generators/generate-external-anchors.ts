import {
  getNodeByIdRoadmapSelector,
  getRootNodesIds,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import {
  getComponentAnchorsPositions,
  getNodeAnchorsPositions,
  getSubNodeAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-element-anchors';

export function getRenderedRootNodesExternalAnchorsPositions(
  excludedNodes: string[]
) {
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

export function getSubNodeExternalAnchorsPositions(
  subNodeId: string,
  excludedNodes: string[]
) {
  const node = getNodeByIdRoadmapSelector(subNodeId);
  const parentNode = getNodeByIdRoadmapSelector(node.properties.nestedWithin);

  const adjacentSubnodesIds = parentNode.subNodeIds.filter(
    (id) => !excludedNodes.includes(id)
  );
  const adjacentComponents = parentNode.components;

  const anchorsPositions = [];

  adjacentComponents.forEach((component) => {
    const anchors = getComponentAnchorsPositions(component);
    anchorsPositions.push(...anchors);
  });

  adjacentSubnodesIds.forEach((nodeId) => {
    const anchors = getSubNodeAnchorsPositions(nodeId);
    anchorsPositions.push(...anchors);
  });

  anchorsPositions.push({
    x: 0,
    y: 0,
  });

  return anchorsPositions;
}

export function getComponentsExternalAnchorsPositions(
  parentNodeId: string,
  componentId: string
) {
  const parentNode = getNodeByIdRoadmapSelector(parentNodeId);

  const adjacentSubnodesIds = parentNode.subNodeIds;
  const adjacentComponents = parentNode.components.filter((component) => {
    return component.id !== componentId;
  });

  const anchorsPositions = [];

  adjacentComponents.forEach((component) => {
    const anchors = getComponentAnchorsPositions(component);
    anchorsPositions.push(...anchors);
  });

  adjacentSubnodesIds.forEach((nodeId) => {
    const anchors = getSubNodeAnchorsPositions(nodeId);
    anchorsPositions.push(...anchors);
  });

  anchorsPositions.push({
    x: 0,
    y: 0,
  });

  return anchorsPositions;
}
