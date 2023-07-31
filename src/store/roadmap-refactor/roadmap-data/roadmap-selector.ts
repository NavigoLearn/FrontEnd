import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export const roadmapSelector = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
} as Roadmap);

export const getNodeByIdRoadmapSelector = (id: string) => {
  return roadmapSelector.get().nodes[id];
};

export const appendNode = (node: NodeClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.nodes[node.id] = node;
  roadmapSelector.set({ ...roadmap });
};

export const setRoadmapSelector = (roadmap: Roadmap) => {
  roadmapSelector.set({ ...roadmap });
};

export const getRootNodesIds = () => {
  return roadmapSelector.get().rootNodesIds;
};

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
