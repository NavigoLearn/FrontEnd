import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function deleteNodeFromChunk(nodeId: string, chunkId: string) {
  const roadmap = roadmapSelector.get();
  const chunk = roadmap.chunks[chunkId];
  roadmap.chunks[chunkId] = chunk.filter((id) => id !== nodeId);
  roadmapSelector.set({ ...roadmap });
}

export function deleteNodeFromChunks(node: NodeClass) {
  const { chunksIds } = node.properties;
  // if (typeof chunksIds === 'undefined') return;
  chunksIds.forEach((chunkId) => {
    deleteNodeFromChunk(node.id, chunkId);
  });
}

export function deleteNodeClassicFromParentAndChildren(node: NodeClass) {
  const roadmap = roadmapSelector.get();
  // deleting node from parent
  const { parentId } = node.properties;
  const parent = roadmap.nodes[parentId];
  parent.properties.childrenIds = parent.properties.childrenIds.filter(
    (id) => id !== node.id
  );
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
      parent.connections = parent.connections.filter(
        (connectionId) => connectionId !== id
      );
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
  roadmap.rootNodesIds = roadmap.rootNodesIds.filter((id) => id !== node.id);
  roadmapSelector.set({ ...roadmap });
}

export const deleteNodeFromSubnodesIds = (node: NodeClass) => {
  const roadmap = roadmapSelector.get();
  // deletes subnode from parent
  const { nestedWithin } = node.properties;
  const parent = roadmap.nodes[nestedWithin];
  parent.subNodeIds = parent.subNodeIds.filter((id) => id !== node.id);
  roadmapSelector.set({ ...roadmap });
};

export const deleteTemplate = (templateId: string) => {
  const roadmap = roadmapSelector.get();
  delete roadmap.templates[templateId];
  roadmapSelector.set({ ...roadmap });
};

export const deleteNodeFromRootNodes = (node: NodeClass) => {
  const roadmap = roadmapSelector.get();
  roadmap.rootNodesIds = roadmap.rootNodesIds.filter((id) => id !== node.id);
  roadmapSelector.set({ ...roadmap });
};

export const deleteNodeFromRoadmapNodes = (nodeId: string) => {
  const roadmap = roadmapSelector.get();
  delete roadmap.nodes[nodeId];
  roadmapSelector.set({ ...roadmap });
};

export function deleteNodeSubNodesRecursive(node: NodeClass) {
  // deletes all subnodes from the node recursively excluding the node itself
  const queue = [];
  const auxQueue = [];

  node.subNodeIds.forEach((id) => {
    auxQueue.push(id);
  });

  while (auxQueue.length > 0) {
    const id = auxQueue.shift();
    const childNode = getNodeByIdRoadmapSelector(id);
    childNode.subNodeIds.forEach((subNodeId) => {
      auxQueue.push(subNodeId);
    });
    queue.push(id);
  }

  while (queue.length > 0) {
    const id = queue.shift();
    const childNode = getNodeByIdRoadmapSelector(id);
    deleteNodeFromRoadmapNodes(childNode.id);
  }
}
