import React from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/displayers/editor/editor-pages/nodes-page/NodeComponent';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DropdownPlus from '@src/UI-library/svg-animations/dropdownplus/DropdownPlus';
import { appendSubNodeId } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { appendSubNode } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';

const Nodes = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='w-full h-full'>
      <div className='relative group mt-5 w-full h-[58px] rounded-lg border-gray-200 border-2'>
        <button
          type='button'
          className='text-xl text-darkBlue font-medium font-roboto-text text-center flex justify-between items-center w-full h-full px-5'
          onClick={() => {
            appendSubNode(node);
          }}
        >
          Add nested node
          <DropdownPlus />
        </button>
      </div>
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
