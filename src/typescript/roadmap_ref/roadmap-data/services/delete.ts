import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function deleteNodeFromChunk(nodeId: string, chunkId: string) {
  const roadmap = roadmapSelector.get();
  const chunk = roadmap.chunks[chunkId];
  const newChunk = chunk.filter((id) => id !== nodeId);
  roadmap.chunks[chunkId] = newChunk;
  roadmapSelector.set({ ...roadmap });
}

export function deleteNodeFromChunks(node: NodeClass) {
  const { chunksIds } = node.properties;
  chunksIds.forEach((chunkId) => {
    deleteNodeFromChunk(node.id, chunkId);
  });
}

export function deleteNodeClassicFromParentAndChildren(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  // deleting node from parent
  const { parentId } = node.properties;
  const parent = roadmap.nodes[parentId];
  const newChildren = parent.properties.childrenIds.filter(
    (id) => id !== node.id
  );
  parent.properties.childrenIds = newChildren;
  // redirecting children to parent
  const children = node.properties.childrenIds;
  children.forEach((id) => {
    const child = roadmap.nodes[id];
    child.properties.parentId = parentId;
    parent.properties.childrenIds.push(id);
  });
  // redirect connections to parent
  const { connections } = node;
  connections.forEach((id) => {
    const connection = roadmap.connections[id];
    const { from, to } = connection;
    if (from === parentId && to === node.id) {
      // deletes connection with parent ( divorce )
      delete roadmap.connections[id];
      // filter connection from parent connections
      const newParentConnections = parent.connections.filter(
        (connectionId) => connectionId !== id
      );
      parent.connections = newParentConnections;
      return;
    }
    // migrates children connections to its parent ( so the children grandparent )
    if (from === node.id) {
      connection.from = parentId;
      parent.connections.push(id);
    }
    if (to === node.id) {
      connection.to = parentId;
      parent.connections.push(id);
    }
  });

  roadmapSelector.set({ ...roadmap });
}

export function deleteNodeClassicFromRoadmapAndChunks(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  // deletes node from roadmap and from chunks
  deleteNodeFromChunks(node);
  delete roadmap.nodes[node.id];
  // deletes from rootNodesIds
  const newRootNodesIds = roadmap.rootNodesIds.filter((id) => id !== node.id);
  roadmap.rootNodesIds = newRootNodesIds;
  roadmapSelector.set({ ...roadmap });
}

export const deleteNodeSubNode = (node: NodeClass) => {
  const roadmap = roadmapSelector.get();
  // deletes subnode from parent
  const { nestedWithin } = node.properties;
  const parent = roadmap.nodes[nestedWithin];
  const newSubNodes = parent.subNodeIds.filter((id) => id !== node.id);
  parent.subNodeIds = newSubNodes;
  roadmapSelector.set({ ...roadmap });
};
