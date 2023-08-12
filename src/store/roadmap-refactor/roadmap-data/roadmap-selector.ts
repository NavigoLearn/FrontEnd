import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export const roadmapSelector = atom({
  nodes: {},
  connections: {},
  chunks: {},
  rootNodesIds: [],
  data: {
    colorTheme: 'defaultTheme',
  },
} as Roadmap);

export const getNodeByIdRoadmapSelector = (id: string) => {
  return roadmapSelector.get().nodes[id];
};

export const appendNodeRoadmapSelector = (node: NodeClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.nodes[node.id] = node;
  roadmapSelector.set({ ...roadmap });
};

export const setRoadmapSelector = (roadmap: Roadmap) => {
  roadmapSelector.set({ ...roadmap });
};

export function tracebackNodeToRoot(nodeId: string) {
  const tracebackNodes = [];
  let currentNode = roadmapSelector.get().nodes[nodeId];
  while (currentNode.properties.nestedWithin) {
    tracebackNodes.push(currentNode.properties.nestedWithin);
    currentNode =
      roadmapSelector.get().nodes[currentNode.properties.nestedWithin];
  }
  return tracebackNodes;
}

export const getRootNodesIds = () => {
  return roadmapSelector.get().rootNodesIds;
};

export const appendRootNodeId = (id: string) => {
  const roadmap = roadmapSelector.get();
  roadmap.rootNodesIds.push(id);
  roadmapSelector.set({ ...roadmap });
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

export const addConnectionRoadmapSelector = (connection: ConnectionClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.connections[connection.id] = connection;
  roadmapSelector.set({ ...roadmap });
};

export const getConnectionByIdRoadmapSelector = (id: string) => {
  return roadmapSelector.get().connections[id];
};
