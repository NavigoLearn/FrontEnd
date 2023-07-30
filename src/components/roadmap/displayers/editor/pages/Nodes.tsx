import React from 'react';
import ButtonOutsideGray from '@components/roadmap/displayers/editor/components/builder/ButtonOutsideGray';
import ButtonInsideGeneric from '@components/roadmap/displayers/editor/components/builder/ButtonInsideGeneric';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/components/NodeComponent';
import { nodeFactorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/nested';
import { appendSubNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { appendNode } from '@store/roadmap-refactor/roadmap-data/roadmap-placeholder';
import { getNodeByIdRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';

const Nodes = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapEdit(selectedNodeId);

  function addNestedNode() {
    const newNestedNode = nodeFactorySubNode(node.id); // creates node
    appendSubNode(node, newNestedNode.id); // appends to the parent of nesting
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
        {node.subNodeIds.map((id) => {
          return (
            // at this component is the node tab problem
            <NodeComponent parentNestId={selectedNodeId} id={id} key={id} />
            // <div key={id}>dawg</div>
          );
        })}
      </div>
    </div>
  );
};

export default Nodes;
