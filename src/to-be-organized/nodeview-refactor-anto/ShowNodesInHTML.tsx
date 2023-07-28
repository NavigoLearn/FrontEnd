import React from 'react';
import NodeView from '@src/to-be-organized/nodeview-refactor-anto/NodeView';

const ShowNodesInHTML = () => {
  return (
    <div className='w-screen h-screen flex border-2 border-black '>
      <NodeView nodeId='node1' centerOffset={{ x: 800, y: 800 }} />
    </div>
  );
};

export default ShowNodesInHTML;
