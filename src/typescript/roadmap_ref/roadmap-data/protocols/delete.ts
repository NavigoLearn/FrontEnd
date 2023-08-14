import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import {
  deleteNodeClassicFromParentAndChildren,
  deleteNodeClassicFromRoadmapAndChunks,
  deleteNodeSubNode,
} from '@src/typescript/roadmap_ref/roadmap-data/services/delete';

export function deleteProtocolNodeFromRoadmap(node: NodeClass) {
  if (node.flags.renderedOnRoadmapFlag) {
    // deletes node from parent children and redirects children to parent + connections to parent
    deleteNodeClassicFromParentAndChildren(node);
    // delete from roadmap and from chunks
    deleteNodeClassicFromRoadmapAndChunks(node);
  } else if (node.flags.subNodeFlag) {
    // deletes node from parent children and redirects children to parent + connections to parent
    deleteNodeSubNode(node);
  }

  triggerChunkRerender();
}
