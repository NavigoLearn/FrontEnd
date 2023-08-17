import React from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/editor-pages/nodes-page/NodeComponent';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

const Nodes = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='w-full h-full'>
      {/* <ButtonOutsideGray> */}
      {/*  <ButtonInsideGeneric */}
      {/*    name='Add a nested Node' */}
      {/*    icon='/editor/addCircle.svg' */}
      {/*    onClick={() => { */}
      {/*      appendNestedNode(node); */}
      {/*    }} */}
      {/*  /> */}
      {/* </ButtonOutsideGray> */}
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
