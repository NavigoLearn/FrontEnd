import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { triggerConnectionRerender } from '@store/roadmap-refactor/render/rerender-trigger-connections';
import renderedConnections from '@store/roadmap-refactor/render/rendered-connections';

export const triggerNodeConnectionsRerender = (nodeId: string) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  node.connections.forEach((connectionId) => {
    triggerConnectionRerender(connectionId);
  });
};

export const triggerAllConnectionsRerender = () => {
  const { connections } = renderedConnections.get();

  connections.forEach((connId) => {
    triggerConnectionRerender(connId);
  });
};
