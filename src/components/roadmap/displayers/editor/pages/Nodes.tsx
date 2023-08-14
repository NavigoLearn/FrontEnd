import React from 'react';
import ButtonOutsideGray from '@components/roadmap/displayers/editor/components/builder/ButtonOutsideGray';
import ButtonInsideGeneric from '@components/roadmap/displayers/editor/components/builder/ButtonInsideGeneric';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/components/NodeComponent';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { appendNestedNode } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';

const Nodes = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='w-full h-full'>
      <ButtonOutsideGray>
        <ButtonInsideGeneric
          name='Add a nested Node'
          icon='/editor/addCircle.svg'
          onClick={() => {
            appendNestedNode(node);
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
