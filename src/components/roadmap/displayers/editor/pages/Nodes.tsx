import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/components/NodeComponent';

const Nodes = () => {
  const { node, selectedNodeId } = useStore(editorSelectedData);

  const [arr, setArr] = useState<any>([]);
  useEffect(() => {
    console.log('Nodes', node, selectedNodeId);
  }, []);

  return (
    <div className='w-full h-full px-6'>
      <div className='flex flex-col gap-4 mt-5'>
        {node.nestedNodesIds.map((id) => {
          return <NodeComponent id={id} key={id} />;
        })}
      </div>
    </div>
  );
};

export default Nodes;
