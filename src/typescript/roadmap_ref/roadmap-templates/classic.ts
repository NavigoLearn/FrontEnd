import { factoryNodeClassic } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import { factoryConnection } from '@src/typescript/roadmap_ref/node/connections/factories-protocols';
import { factorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/sub-node';
import { appendRootNodeId } from '@src/typescript/roadmap_ref/roadmap-data/services/append';
import {
  injectRoadmapConnection,
  injectRoadmapGlobalRootNodeId,
  injectRoadmapNode,
} from '@src/typescript/roadmap_ref/roadmap-data/services/inject';

import { appendSubNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';

export function factoryRoadmapClassic() {
  const node0 = factoryNodeClassic(0, 0, 200, 50);
  injectRoadmapGlobalRootNodeId(node0.id);
  const node1 = factoryNodeClassic(0, 150, 200, 50);
  const connection0 = factoryConnection(node0, node1);

  const subNode00 = factorySubNode(node0.id, 100, 50, -75, -75);
  const subNode01 = factorySubNode(node0.id, 100, 50, 75, 75);
  const subNode02 = factorySubNode(node0.id, 100, 50, 75, -75);
  const subNode03 = factorySubNode(node0.id, 100, 50, -75, 75);
  injectRoadmapNode(node0);
  injectRoadmapNode(node1);
  injectRoadmapConnection(connection0);

  appendSubNode(node0, subNode00.id);
  appendSubNode(node0, subNode01.id);
  appendSubNode(node0, subNode02.id);
  appendSubNode(node0, subNode03.id);

  injectRoadmapNode(subNode00);
  injectRoadmapNode(subNode01);
  injectRoadmapNode(subNode02);
  injectRoadmapNode(subNode03);

  appendRootNodeId(node0.id);
  appendRootNodeId(node1.id);
}

export function factoryRoadmapFirstAttempt() {
  const node0 = factoryNodeClassic(0, 0, 500, 500);
  injectRoadmapGlobalRootNodeId(node0.id);
  const node1 = factoryNodeClassic(-200, -200, 200, 200);
  const connection0 = factoryConnection(node0, node1);

  const subNode00 = factorySubNode(node0.id, 100, 50, -75, -75);
  const subNode01 = factorySubNode(node0.id, 100, 50, 75, 75);
  const subNode02 = factorySubNode(node0.id, 100, 50, 75, -75);
  const subNode03 = factorySubNode(node0.id, 100, 50, -75, 75);
  injectRoadmapNode(node0);
  injectRoadmapNode(node1);
  injectRoadmapConnection(connection0);

  appendSubNode(node0, subNode00.id);
  appendSubNode(node0, subNode01.id);
  appendSubNode(node0, subNode02.id);
  appendSubNode(node0, subNode03.id);

  injectRoadmapNode(subNode00);
  injectRoadmapNode(subNode01);
  injectRoadmapNode(subNode02);
  injectRoadmapNode(subNode03);

  appendRootNodeId(node0.id);
  appendRootNodeId(node1.id);
}
