import React from 'react';
import NodeView from './NodeView';
import nodesData from './nodesplaceholders.json';

const ShowNodesInHTML = () => {
  return (
    <div className='w-screen h-screen bg-slate-600'>
      <NodeView node={nodesData.node} />;
    </div>
  );
};

export default ShowNodesInHTML;
