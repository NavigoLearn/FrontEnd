import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

const roadmapPlaceholder = atom({
  nodes: {
    // '0': classicNodeFactoryBoilerplate(),
  }, // the nodes json will contain only the nodes currently in elements-editing mode
  // if you want to get the node just search it by id
  connections: {},
  chunks: {},
} as Roadmap);

export const appendNode = (node: NodeClass) => {
  const originalStore = roadmapPlaceholder.get();
  roadmapPlaceholder.set({
    ...originalStore,
    nodes: {
      ...originalStore.nodes,
      [node.data.id]: node,
    },
  });
};

export default roadmapPlaceholder;
