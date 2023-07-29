import { Roadmap } from '@type/roadmap/stores/roadmap';
import { setRoadmapEdit } from '@src/store/roadmap-refactor/roadmap-data/roadmap-edit';

import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { nodeFactoryClassicBoilerplate } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import { injectNewId } from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import { nodeFactorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/nested';
import { appendSubNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';

function nodeBuilder(
  id: string,
  x: number,
  y: number,
  width?: number,
  height?: number
) {
  const node = nodeFactoryClassicBoilerplate(id);
  mutateNodeWidth(node, width || 100);
  mutateNodeHeight(node, height || 100);

  mutateNodeCoordX(node, x);
  mutateNodeCoordY(node, y);
  injectNewId(node, id);
  return node;
}
export const roadmap1: Roadmap = {
  rootNodesIds: ['0', '1'],
  nodes: {
    '0': nodeBuilder('0', 500, 200, 500, 500),
    '1': nodeBuilder('1', 100, 100, 200, 100),
  },
  connections: {},
  chunks: {},
};
function subNodeAppender(
  parentId: string,
  width: number,
  height: number,
  x: number,
  y: number
) {
  // appends a subnode to the parent node
  const node = nodeFactorySubNode(parentId);
  mutateNodeWidth(node, width);
  mutateNodeHeight(node, height);
  mutateNodeCoordX(node, x);
  mutateNodeCoordY(node, y);
  // gets roadmap and appends the subnode
  const roadmap = roadmap1;
  roadmap.nodes[node.id] = node;
  const parentNode = roadmap.nodes[parentId];
  appendSubNode(parentNode, node.id);
}

subNodeAppender('0', 100, 50, -75, -75);
subNodeAppender('0', 100, 50, 75, 75);
subNodeAppender('0', 100, 50, 75, -75);
subNodeAppender('0', 100, 50, -75, 75);

setRoadmapEdit(roadmap1);
