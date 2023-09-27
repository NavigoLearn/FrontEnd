import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import type { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export function removeRedundantSubnodesWithoutParentPresent(
  redundantSubnodeIds: string[]
) {
  const roadmap: IRoadmap = getRoadmapSelector();
  console.log(
    'attempting self-correction: remove redundant nodes without parent present',
    redundantSubnodeIds,
    deepCopy(roadmap)
  );
  console.log('redundant nodes data');
  redundantSubnodeIds.forEach((id) => {
    console.log(id, roadmap.nodes[id]);
  });
  try {
    const { nodes } = roadmap;
    for (let i = 0; i < redundantSubnodeIds.length; i += 1) {
      const subnode = nodes[redundantSubnodeIds[i]];
      delete nodes[subnode.id];
    }
    console.warn(
      'succeded self-correction: removeRedundantSubnodes new nodes',
      deepCopy(getRoadmapSelector())
    );
  } catch (e) {
    console.warn('failed self-correction: removeRedundantSubnodes', e);
  }
}
export function removeRedundantSubnodesWithParentPresent(
  redundantSubnodeIds: string[]
) {
  const roadmap: IRoadmap = getRoadmapSelector();
  console.log(
    'attempting self-correction: remove redundant nodes with parent present',
    redundantSubnodeIds,
    deepCopy(roadmap)
  );
  console.log('redundant nodes data');
  redundantSubnodeIds.forEach((id) => {
    console.log(id, roadmap.nodes[id]);
  });
  try {
    const { nodes } = roadmap;
    for (let i = 0; i < redundantSubnodeIds.length; i += 1) {
      const subnode = nodes[redundantSubnodeIds[i]];
      const parentNode = nodes[subnode.properties.nestedWithin];
      if (!parentNode.subNodeIds.includes(subnode.id)) {
        delete nodes[subnode.id];
      }
    }
    console.warn(
      'succeded self-correction: removeRedundantSubnodes new nodes',
      deepCopy(getRoadmapSelector())
    );
  } catch (e) {
    console.warn('failed self-correction: removeRedundantSubnodes', e);
  }
}
