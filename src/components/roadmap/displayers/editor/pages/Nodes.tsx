import React from 'react';
import ButtonOutsideGray from '@components/roadmap/displayers/editor/components/builder/ButtonOutsideGray';
import ButtonInsideGeneric from '@components/roadmap/displayers/editor/components/builder/ButtonInsideGeneric';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/components/NodeComponent';
import { nodeFactorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/sub-node';
import { appendSubNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import {
  appendNodeRoadmapSelector,
  getNodeByIdRoadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers';
import { draggableElementProtocol } from '@components/roadmap/displayers/editor/pages/utils';

const Nodes = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  function addNestedNode() {
    const newNestedNode = nodeFactorySubNode(node.id, 100, 100, 0, 0); // creates node
    appendSubNode(node, newNestedNode.id); // appends to the parent of nesting
    appendNodeRoadmapSelector(newNestedNode);
    draggableElementProtocol(newNestedNode.draggingBehavior, newNestedNode.id);
    triggerNodeRerender(node.id);
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
          );
        })}
      </div>
    </div>
  );
};

export default Nodes;
