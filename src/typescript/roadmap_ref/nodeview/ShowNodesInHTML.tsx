import React from 'react';
import { getNodeById } from '@store/roadmap/data/roadmap_static';
import { get } from 'astro/dist/assets/image-endpoint';
import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { factoryComponentJSONEmpty } from '@typescript/roadmap_ref/node/components/text/factories';
import { ComponentTitle } from '@typescript/roadmap_ref/node/components/text/core';
import NodeView from './NodeView';

const ShowNodesInHTML = () => {
  const node = new NodeClass();
  node.data.id = 'node1';
  node.properties.width = 500;
  node.properties.height = 500;
  node.componentsJSON[0] = factoryComponentJSONEmpty('Title');
  node.componentsJSON[1] = factoryComponentJSONEmpty('Description');
  node.nestedNodesIds = [
    'node2',
    'node3',
    'node4',
    'node5',
    'node6',
    'node7',
    'node8',
    'node9',
  ];
  // this is a git push test
  return (
    <div className='w-screen h-screen bg-[#ECEFF2] flex'>
      <NodeView node={node} />
    </div>
  );
};

export default ShowNodesInHTML;
