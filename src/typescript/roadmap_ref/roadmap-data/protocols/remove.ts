import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function deleteNodeFromRoadmap(node: NodeClass) {
  // deletes node from parent children
  const { parentId } = node.properties;

  // delete from other nodes
  // delete from connections and take down connections
  // delete all subchildren/ rereoute them to the other nodes
  // delete from chunks
}
