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

// if (nodeID === 'node5') {
//   const node5 = new NodeClass();
//   node5.data.id = 'node5';
//   node5.properties.width = 65;
//   node5.properties.height = 54;
//   node5.components[0] = factoryComponentEmpty('Title');
//   node5.components[1] = factoryComponentEmpty('Description');
//   node5.properties.color.primary = '#FF0000';
//   return node5;
// }
// if (nodeID === 'node6') {
//   const node6 = new NodeClass();
//   node6.data.id = 'node6';
//   node6.properties.width = 90;
//   node6.properties.height = 90;
//   node6.componentsJSON[0] = factoryComponentEmpty('Title');
//   node6.componentsJSON[1] = factoryComponentEmpty('Description');
//   return node6;
// }
// if (nodeID === 'node7') {
//   const node7 = new NodeClass();
//   node7.data.id = 'node7';
//   node7.properties.width = 70;
//   node7.properties.height = 70;
//   node7.componentsJSON[0] = factoryComponentEmpty('Title');
//   node7.componentsJSON[1] = factoryComponentEmpty('Description');
//   return node7;
// }
// if (nodeID === 'node8') {
//   const node8 = new NodeClass();
//   node8.data.id = 'node8';
//   node8.properties.width = 33;
//   node8.properties.height = 35;
//   node8.componentsJSON[0] = factoryComponentEmpty('Title');
//   node8.componentsJSON[1] = factoryComponentEmpty('Description');
//   return node8;
// }
// if (nodeID === 'node9') {
//   const node9 = new NodeClass();
//   node9.data.id = 'node9';
//   node9.properties.width = 100;
//   node9.properties.height = 100;
//   node9.componentsJSON[0] = factoryComponentEmpty('Title');
//   node9.componentsJSON[1] = factoryComponentEmpty('Description');
//   return node9;
// }
