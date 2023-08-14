import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export function injectRoadmapNode(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  roadmap.nodes[node.id] = node;
  roadmapSelector.set({ ...roadmap });
}

export const injectRoadmapConnection = (connection: ConnectionClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.connections[connection.id] = connection;
  roadmapSelector.set({ ...roadmap });
};

export const injectRoadmapGlobalRootNodeId = (id: string) => {
  const roadmap = roadmapSelector.get();
  roadmap.data.globalRootNodeId = id;
  roadmapSelector.set({ ...roadmap });
};
