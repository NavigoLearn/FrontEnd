import { Roadmap } from '@type/roadmap/roadmap';
import {
  generateNNodesInfo,
  generateConnection,
} from '@typescript/roadmap/generators';
import { networkLatency } from './params';
//
// const roadmap1: Roadmap = {
//   nodes: generateNNodesInfo('title', 'tabid1', 300, 150, 'parent', [''], 2, 2)
//     .nodes,
//   connections: {
//     // list of all connections
//   },
//   resources: {
//     // list of all resource nodes
//   },
//   chunks: generateNNodesInfo(
//     'title',
//     'tabid1',
//     300,
//
//     150,
//     'parent',
//     [''],
//     2,
//     2
//   ).chunksNodes,
//   chunkSize: 400,
// };
//
// const roadmap2: Roadmap = {
//   nodes: generateNNodesInfo('title', 'tabid1', 300, 150, 'parent', [''], 5, 5)
//     .nodes,
//   connections: {
//     // list of all connections
//   },
//   resources: {
//     // list of all resource nodes
//   },
//   chunks: generateNNodesInfo(
//     'title',
//     'tabid1',
//     300,
//
//     150,
//     'parent',
//     [''],
//     5,
//     5
//   ).chunksNodes,
//   chunkSize: 400,
// };
//
// const roadmap3: Roadmap = {
//   nodes: generateNNodesInfo('title', 'tabid1', 300, 150, 'parent', [''], 5, 5)
//     .nodes,
//   connections: {
//     // list of all connections
//   },
//   resources: {
//     // list of all resource nodes
//   },
//   chunks: generateNNodesInfo(
//     'title',
//     'tabid1',
//     300,
//
//     150,
//     'parent',
//     [''],
//     5,
//     5
//   ).chunksNodes,
//   chunkSize: 400,
// };
//
// function addConn(idNode1, idNode2) {
//   roadmap3.connections[`${idNode1}${idNode2}`] = generateConnection(
//     `${idNode1}${idNode2}`,
//     idNode1,
//     idNode2
//   );
//   roadmap3.nodes[idNode1].connections.push(`${idNode1}${idNode2}`);
//   roadmap3.nodes[idNode2].connections.push(`${idNode1}${idNode2}`);
// }
//
// addConn('nodeId0_0', 'nodeId2_2');
// addConn('nodeId0_0', 'nodeId1_2');
// addConn('nodeId0_0', 'nodeId2_1');
// addConn('nodeId0_0', 'nodeId1_1');
// addConn('nodeId0_0', 'nodeId2_0');
// addConn('nodeId0_0', 'nodeId1_0');
// addConn('nodeId0_0', 'nodeId0_1');
// addConn('nodeId0_0', 'nodeId0_2');
//
const roadmap4: Roadmap = {
  nodes: generateNNodesInfo('title', 'tabid1', 300, 150, 'parent', [''], 1, 1)
    .nodes,
  connections: {
    // list of all connections
  },
  resources: {
    // list of all resource nodes
  },
  chunks: generateNNodesInfo(
    'title',
    'tabid1',
    300,

    150,
    'parent',
    [''],
    1,
    1
  ).chunksNodes,
  chunkSize: 400,
};

const roadmapData = {
  roadmap4,
};

export const a = 1;
export const fetchRoadmap = async (id: string) => {
  console.log('called');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('resolved');
      resolve(roadmapData[id]);
    }, networkLatency);
  });
};
