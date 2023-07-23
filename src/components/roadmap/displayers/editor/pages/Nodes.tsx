import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/components/NodeComponent';
import { NodeFactoryNested } from '@typescript/roadmap_ref/node/core/factories/templates/nested';
import { appendNestedNode } from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { appendNode } from '@store/roadmap-refactor/roadmap-data/roadmap-placeholder';

const Nodes = () => {
  const { node, selectedNodeId } = useStore(editorSelectedData);

  const [arr, setArr] = useState<any>([]);
  useEffect(() => {
    console.log('Nodes', node, selectedNodeId);
  }, []);

  function addNestedNode() {
    console.log('add nested node');
    const newNestedNode = NodeFactoryNested(node.data.id); // creates node
    appendNestedNode(node, newNestedNode.data.id); // appends to the parent of nesting
    appendNode(newNestedNode);
    triggerRerenderEditor(); // trigger rerender
  }
  return (
    <div className='w-full h-full px-6'>
      <button
        type='button'
        onClick={() => {
          console.log('add subnode');
          addNestedNode();
        }}
      >
        Add a subnode
      </button>
      <div className='flex flex-col gap-4 mt-5'>
        {node.nestedNodesIds.map((id) => {
          return (
            <NodeComponent parentNestId={selectedNodeId} id={id} key={id} />
          );
        })}
      </div>
    </div>
  );
};

export default Nodes;
