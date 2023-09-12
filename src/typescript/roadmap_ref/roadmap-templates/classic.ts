import { factoryNodeClassicCustomizable } from '@src/typescript/roadmap_ref/node/core/factories/base-templates-factories/classic';
import { factoryConnection } from '@src/typescript/roadmap_ref/node/connections/factories-protocols';
import { factorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/base-templates-factories/sub-node';
import { appendRootNodeId } from '@src/typescript/roadmap_ref/roadmap-data/services/append';
import {
  injectRoadmapConnection,
  injectRoadmapGlobalRootNodeId,
  injectRoadmapNode,
} from '@src/typescript/roadmap_ref/roadmap-data/services/inject';

import {
  appendChildNodeId,
  appendSubNodeId,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { injectParentData } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';

export function createAndSetRoadmapDevTest() {
  const nodesPerRow = 5;
  const nodesPerColumn = 5;
  const nodesPerRowOffset = 100;
  const nodesPerColumnOffset = 100;
  const nodesWidth = 200;
  const nodesHeight = 50;
  for (let i = 0; i < nodesPerRow; i++) {
    for (let j = 0; j < nodesPerColumn; j++) {
      const node = factoryNodeClassicCustomizable(
        i * nodesPerRowOffset,
        j * nodesPerColumnOffset,
        nodesWidth,
        nodesHeight,
        i * nodesPerRow + j
      );
      injectRoadmapNode(node);
      appendRootNodeId(node.id);
    }
  }

  const node0 = factoryNodeClassicCustomizable(0, 0, 200, 50, 0);
  injectRoadmapGlobalRootNodeId(node0.id);
  const node1 = factoryNodeClassicCustomizable(0, 150, 200, 50, 1);
  const node2 = factoryNodeClassicCustomizable(0, 300, 200, 50, 2);
  const node3 = factoryNodeClassicCustomizable(300, 300, 200, 50, 3);
  const node4 = factoryNodeClassicCustomizable(-300, 300, 200, 50, 4);
  const connection0 = factoryConnection(node0, node1);
  const connection1 = factoryConnection(node1, node2);
  const connection2 = factoryConnection(node2, node3);
  const connection3 = factoryConnection(node2, node4);

  injectParentData(node1, node0.id);
  injectParentData(node2, node1.id);
  injectParentData(node3, node2.id);
  injectParentData(node4, node2.id);

  appendChildNodeId(node0, node1.id);
  appendChildNodeId(node1, node2.id);
  appendChildNodeId(node2, node3.id);
  appendChildNodeId(node2, node4.id);

  injectRoadmapNode(node0);
  injectRoadmapNode(node1);
  injectRoadmapNode(node2);
  injectRoadmapNode(node3);
  injectRoadmapNode(node4);

  injectRoadmapConnection(connection0);
  injectRoadmapConnection(connection1);
  injectRoadmapConnection(connection2);
  injectRoadmapConnection(connection3);

  appendRootNodeId(node0.id);
  appendRootNodeId(node1.id);
  appendRootNodeId(node2.id);
  appendRootNodeId(node3.id);
  appendRootNodeId(node4.id);
}

export function createAndSetRoadmapClassic() {
  const node0 = factoryNodeClassicCustomizable(0, 0, 200, 50, 0);
  injectRoadmapGlobalRootNodeId(node0.id);
  node0.name = 'Basic node';
  const node1 = factoryNodeClassicCustomizable(0, 150, 200, 50, 1);
  const node2 = factoryNodeClassicCustomizable(0, 300, 200, 50, 2);
  const node3 = factoryNodeClassicCustomizable(300, 300, 200, 50, 3);
  const node4 = factoryNodeClassicCustomizable(-300, 300, 200, 50, 4);
  const connection0 = factoryConnection(node0, node1);
  const connection1 = factoryConnection(node1, node2);
  const connection2 = factoryConnection(node2, node3);
  const connection3 = factoryConnection(node2, node4);

  injectParentData(node1, node0.id);
  injectParentData(node2, node1.id);
  injectParentData(node3, node2.id);
  injectParentData(node4, node2.id);

  appendChildNodeId(node0, node1.id);
  appendChildNodeId(node1, node2.id);
  appendChildNodeId(node2, node3.id);
  appendChildNodeId(node2, node4.id);

  injectRoadmapNode(node0);
  injectRoadmapNode(node1);
  injectRoadmapNode(node2);
  injectRoadmapNode(node3);
  injectRoadmapNode(node4);

  injectRoadmapConnection(connection0);
  injectRoadmapConnection(connection1);
  injectRoadmapConnection(connection2);
  injectRoadmapConnection(connection3);

  appendRootNodeId(node0.id);
  appendRootNodeId(node1.id);
  appendRootNodeId(node2.id);
  appendRootNodeId(node3.id);
  appendRootNodeId(node4.id);
  return node0;
}

export function factoryRoadmapFirstAttempt() {
  const node0 = factoryNodeClassicCustomizable(0, 0, 500, 500);
  injectRoadmapGlobalRootNodeId(node0.id);
  const node1 = factoryNodeClassicCustomizable(-200, -200, 200, 200);
  appendChildNodeId(node0, node1.id);
  injectParentData(node1, node0.id);
  const connection0 = factoryConnection(node0, node1);

  const subNode00 = factorySubNode(node0.id, 100, 50, -75, -75);
  const subNode01 = factorySubNode(node0.id, 100, 50, 75, 75);
  const subNode02 = factorySubNode(node0.id, 100, 50, 75, -75);
  const subNode03 = factorySubNode(node0.id, 100, 50, -75, 75);
  injectRoadmapNode(node0);
  injectRoadmapNode(node1);
  injectRoadmapConnection(connection0);

  appendSubNodeId(node0, subNode00.id);
  appendSubNodeId(node0, subNode01.id);
  appendSubNodeId(node0, subNode02.id);
  appendSubNodeId(node0, subNode03.id);

  injectRoadmapNode(subNode00);
  injectRoadmapNode(subNode01);
  injectRoadmapNode(subNode02);
  injectRoadmapNode(subNode03);

  appendRootNodeId(node0.id);
  appendRootNodeId(node1.id);
}

export function createGrid() {
  let lastnode = factoryNodeClassicCustomizable(0, 0, 500, 500, 0);
  injectRoadmapGlobalRootNodeId(lastnode.id);

  // define bounds
  const xMin = 0;
  const yMin = 0;
  const width = 1500;
  const height = 1500;
  const distance = 200;

  let count = 0;

  // create nodes
  for (let x = xMin; x < xMin + width; x += distance) {
    for (let y = yMin; y < yMin + height; y += distance) {
      count += 5;
      const node = factoryNodeClassicCustomizable(x, y, 90, 90, x + y * width);
      const connection = factoryConnection(lastnode, node);
      appendRootNodeId(node.id);
      appendChildNodeId(lastnode, node.id);
      injectParentData(node, lastnode.id);

      // create subnodes
      const subNode0 = factorySubNode(node.id, 20, 20, -20, -20);
      const subNode1 = factorySubNode(node.id, 20, 20, +20, +20);
      const subNode2 = factorySubNode(node.id, 20, 20, +20, -20);
      const subNode3 = factorySubNode(node.id, 20, 20, -20, +20);

      appendSubNodeId(node, subNode0.id);
      appendSubNodeId(node, subNode1.id);
      appendSubNodeId(node, subNode2.id);
      appendSubNodeId(node, subNode3.id);

      injectRoadmapNode(subNode0);
      injectRoadmapNode(subNode1);
      injectRoadmapNode(subNode2);
      injectRoadmapNode(subNode3);

      injectRoadmapNode(node);
      injectRoadmapConnection(connection);
      lastnode = node;
    }
  }
  console.log('count', count);
}
