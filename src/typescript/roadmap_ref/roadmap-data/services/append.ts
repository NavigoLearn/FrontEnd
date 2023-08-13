import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export function addNodeToChunk(nodeId: string, chunkId: string) {
  const roadmap = roadmapSelector.get();
  const chunk = roadmap.chunks[chunkId];
  let newChunk = [];
  if (!chunk) {
    newChunk.push(nodeId);
  } else {
    newChunk = [...chunk, nodeId];
  }
  roadmap.chunks[chunkId] = newChunk;
  roadmapSelector.set({ ...roadmap });
}

export function addNodeToChunks(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  const { chunksIds } = node.properties;
  chunksIds.forEach((chunkId) => {
    addNodeToChunk(node.id, chunkId);
  });
}

export function addNode(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  roadmap.nodes[node.id] = node;
  roadmapSelector.set({ ...roadmap });
}

export function addRootNodeId(id: string) {
  const roadmap = roadmapSelector.get();
  roadmap.rootNodesIds.push(id);
  roadmapSelector.set({ ...roadmap });
}

export const addConnectionRoadmapSelector = (connection: ConnectionClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.connections[connection.id] = connection;
  roadmapSelector.set({ ...roadmap });
};

export const appendNodeRoadmapSelector = (node: NodeClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.nodes[node.id] = node;
  roadmapSelector.set({ ...roadmap });
};
export const appendRootNodeId = (id: string) => {
  const roadmap = roadmapSelector.get();
  roadmap.rootNodesIds.push(id);
  roadmapSelector.set({ ...roadmap });
};
