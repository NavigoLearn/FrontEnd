import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function appendNodeToChunk(nodeId: string, chunkId: string) {
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

export function appendNodeToChunks(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  const { chunksIds } = node.properties;
  chunksIds.forEach((chunkId) => {
    appendNodeToChunk(node.id, chunkId);
  });
}
export const appendRootNodeId = (id: string) => {
  const roadmap = roadmapSelector.get();
  roadmap.rootNodesIds.push(id);
  roadmapSelector.set({ ...roadmap });
};
