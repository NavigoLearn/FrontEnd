// eslint-disable-next-line import/no-cycle
import NodeView from '@typescript/roadmap_ref/nodeview/NodeView';
import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { factoryComponentJSONEmpty } from '@typescript/roadmap_ref/node/components/text/factories';
import React from 'react';

// Function should work with node store
const renderSubnodes = (nestedSubnodes: string[]) => {
  const getNodeByID = (nodeID: string): NodeClass | undefined => {
    // placeholder for when nodes store is implemented
    if (nodeID === 'node2') {
      const node2 = new NodeClass();
      node2.data.id = 'node2';
      node2.properties.width = 70;
      node2.properties.height = 70;
      node2.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node2.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      node2.properties.color.primary = '#00FFFF';
      return node2;
    }
    if (nodeID === 'node3') {
      const node3 = new NodeClass();
      node3.data.id = 'node3';
      node3.properties.width = 35;
      node3.properties.height = 49;
      node3.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node3.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      // node3.properties.color.primary = '#0000FF';
      return node3;
    }
    if (nodeID === 'node4') {
      const node4 = new NodeClass();
      node4.data.id = 'node4';
      node4.properties.width = 123;
      node4.properties.height = 37;
      node4.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node4.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      return node4;
    }
    if (nodeID === 'node5') {
      const node5 = new NodeClass();
      node5.data.id = 'node5';
      node5.properties.width = 65;
      node5.properties.height = 54;
      node5.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node5.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      return node5;
    }
    if (nodeID === 'node6') {
      const node6 = new NodeClass();
      node6.data.id = 'node6';
      node6.properties.width = 90;
      node6.properties.height = 90;
      node6.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node6.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      return node6;
    }
    if (nodeID === 'node7') {
      const node7 = new NodeClass();
      node7.data.id = 'node7';
      node7.properties.width = 70;
      node7.properties.height = 70;
      node7.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node7.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      return node7;
    }
    if (nodeID === 'node8') {
      const node8 = new NodeClass();
      node8.data.id = 'node8';
      node8.properties.width = 33;
      node8.properties.height = 35;
      node8.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node8.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      return node8;
    }
    if (nodeID === 'node9') {
      const node9 = new NodeClass();
      node9.data.id = 'node9';
      node9.properties.width = 100;
      node9.properties.height = 100;
      node9.componentsJSON[0] = factoryComponentJSONEmpty('Title');
      node9.componentsJSON[1] = factoryComponentJSONEmpty('Description');
      return node9;
    }
    // If the node is not found, return undefined
    return undefined;
  };

  // TODO fix colors not changing with node properties

  // Map the array of node IDs to an array of NodeView components
  const subnodeComponents = nestedSubnodes.map((nodeID) => {
    console.log('subnodeComponents', nodeID);
    const subnode = getNodeByID(nodeID);
    if (subnode) {
      return <NodeView key={nodeID} node={subnode} />;
    }
    // If the node is not found
    return null;
  });
  return subnodeComponents;
};

export default renderSubnodes;
