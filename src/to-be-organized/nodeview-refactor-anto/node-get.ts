import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { factoryComponentEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';

export type possibleIds =
  | 'node1'
  | 'node2'
  | 'node3'
  | 'node4'
  | 'node5'
  | 'node6'
  | 'node7'
  | 'node8'
  | 'node9';

const node1Builder = (): NodeClass => {
  const node = new NodeClass();
  node.id = 'node1';
  node.data.width = 500;
  node.data.height = 500;
  node.data.color.primary = '#00FF00';
  node.components[0] = factoryComponentEmpty('Title');
  node.components[1] = factoryComponentEmpty('Description');
  node.components[2] = factoryComponentEmpty('Description');
  node.subNodeIds = ['node2', 'node4'];
  // node1 -> node2 -> node3
  // node1 -> node4
  return node;
};

const node2Builder = (): NodeClass => {
  const node = new NodeClass();
  node.id = 'node2';
  node.data.width = 300;
  node.data.height = 300;
  node.components[0] = factoryComponentEmpty('Title');
  node.components[1] = factoryComponentEmpty('Description');
  node.data.color.primary = '#FF0000';
  node.subNodeIds = ['node3'];
  // node1 -> node2 -> node3
  // node1 -> node4
  return node;
};

const node3Builder = (): NodeClass => {
  const node = new NodeClass();
  node.id = 'node3';
  node.data.width = 35;
  node.data.height = 49;
  node.components[0] = factoryComponentEmpty('Title');
  node.components[1] = factoryComponentEmpty('Description');
  node.data.color.primary = '#0000FF';
  // node1 -> node2 -> node3
  // node1 -> node4
  return node;
};

const node4Builder = (): NodeClass => {
  const node = new NodeClass();
  node.id = 'node4';
  node.data.width = 123;
  node.data.height = 37;
  node.components[0] = factoryComponentEmpty('Title');
  node.components[1] = factoryComponentEmpty('Description');
  // node1 -> node2 -> node3
  // node1 -> node4
  return node;
};

export const getNodeByID = (nodeId: possibleIds): NodeClass => {
  // placeholder for when nodes store is implemented
  const nodeMatcher = {
    node1: node1Builder,
    node2: node2Builder,
    node3: node3Builder,
    node4: node4Builder,
  };

  // If the node is not found, return undefined
  if (nodeId in nodeMatcher) {
    return nodeMatcher[nodeId]();
  }
  throw new Error(`Node with id ${nodeId} not found`);
};

// other possible builders
