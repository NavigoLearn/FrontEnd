import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  deleteNodeFromRoadmapNodes,
  deleteNodeClassicFromParentAndChildren,
  deleteNodeClassicFromRoadmapAndChunks,
  deleteNodeFromSubnodesIds,
  deleteNodeSubNodesRecursive,
} from '@src/typescript/roadmap_ref/roadmap-data/services/delete';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function deleteNodeFromRoadmap(node: NodeClass) {
  if (node.flags.renderedOnRoadmapFlag) {
    // deletes node from parent children and redirects children to parent + connections to parent
    deleteNodeClassicFromParentAndChildren(node);
    // cleans up all its subnodes
    deleteNodeSubNodesRecursive(node);
    // delete from roadmap and from chunks
    deleteNodeClassicFromRoadmapAndChunks(node);
  } else if (node.flags.subNodeFlag) {
    const nodeId = node.id;
    deleteNodeSubNodesRecursive(node);
    deleteNodeFromSubnodesIds(node);
    // console.log('deleting node from roadmap nodes');
    deleteNodeFromRoadmapNodes(nodeId);
  }
}

export function deleteProtocolNodeFromRoadmap(node: NodeClass) {
  deleteNodeFromRoadmap(node);
  triggerChunkRerender();
}

export function deleteNodeRecursive(node: NodeClass) {
  node.properties.childrenIds.forEach((childId) => {
    const child = getNodeByIdRoadmapSelector(childId);
    deleteNodeRecursive(child);
  });
  deleteNodeFromRoadmap(node);
}

export function deleteProtocolNodeFromRoadmapRecursive(node: NodeClass) {
  deleteNodeRecursive(node);
  triggerChunkRerender();
}
