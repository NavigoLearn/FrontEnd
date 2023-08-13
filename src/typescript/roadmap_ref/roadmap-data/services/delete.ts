import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function removeNodeFromChunk(nodeId: string, chunkId: string) {
  const roadmap = roadmapSelector.get();
  const chunk = roadmap.chunks[chunkId];
  const newChunk = chunk.filter((id) => id !== nodeId);
  roadmap.chunks[chunkId] = newChunk;
  roadmapSelector.set({ ...roadmap });
}

export function removeNodeFromChunks(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  const { chunksIds } = node.properties;
  chunksIds.forEach((chunkId) => {
    removeNodeFromChunk(node.id, chunkId);
  });
}
