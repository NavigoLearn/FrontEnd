import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import {
  getConnectionByIdRoadmapSelector,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function getIdArrayConnections(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  return node.connections;
}

export function getParentNodeIdBasedOnConnection(nodeId: string) {
  const connectionArr = getIdArrayConnections(nodeId);
  const connection = getConnectionByIdRoadmapSelector(connectionArr[0]);
  const parentNode = getNodeByIdRoadmapSelector(connection.from);
  return parentNode.id;
}

export function getIdCurrentConnection(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const connection = getConnectionByIdRoadmapSelector(node.connections[0]);
  return connection;
}
