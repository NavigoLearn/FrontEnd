import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function getIdArrayConnections(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  return node.connections;
}
