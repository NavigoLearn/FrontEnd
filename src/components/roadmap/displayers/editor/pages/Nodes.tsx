import React from 'react';
import ButtonOutsideGray from '@components/roadmap/displayers/editor/components/builder/ButtonOutsideGray';
import ButtonInsideGeneric from '@components/roadmap/displayers/editor/components/builder/ButtonInsideGeneric';
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

  function addNestedNode() {
    const newNestedNode = NodeFactoryNested(node.data.id); // creates node
    appendNestedNode(node, newNestedNode.data.id); // appends to the parent of nesting
    appendNode(newNestedNode);
    triggerRerenderEditor(); // trigger rerender
  }
  return (
    <div className='w-full h-full'>
      <ButtonOutsideGray>
        <ButtonInsideGeneric
          name='Add a nested Node'
          icon='/editor/addCircle.svg'
          onClick={() => {
            addNestedNode();
          }}
        />
      </ButtonOutsideGray>
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
