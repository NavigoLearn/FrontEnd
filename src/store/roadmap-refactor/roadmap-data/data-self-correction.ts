import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import type { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export function removeRedundantSubnodes(redundantSubnodeIds: string[]) {
  const roadmap: IRoadmap = getRoadmapSelector();
  console.log(
    'attempting self-correction: remove redundant nodes',
    redundantSubnodeIds,
    deepCopy(roadmap)
  );
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
}
