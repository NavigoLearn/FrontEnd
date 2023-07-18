import React from 'react';
import NodeView from './NodeView';
import nodesData from './nodesplaceholders.json';

const ShowNodesInHTML = () => {
  return (
    <div className='w-screen h-screen bg-[#ECEFF2] flex'>
      <NodeView node={nodesData.node} />
    </div>
  );
};

export default ShowNodesInHTML;
