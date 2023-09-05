import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import NodeComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/nodes-page/NodeComponent';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DropdownPlus from '@src/UI-library/svg-components/dropdownplus/DropdownPlus';
import { appendSubNodeId } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { appendSubNode } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import { deleteAllSubNodes } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import DeleteButton from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/DeleteButton';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';

const SubNodesPage = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-between h-[58px] items-center'>
        <div className='relative group mt-5 w-52 h-[58px] rounded-lg border-gray-200 border-2'>
          <button
            type='button'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className='text-md mr-4 text-darkBlue hover:bg-darkBlue hover:rounded-md hover:text-white font-medium font-roboto-text text-center flex justify-between items-center w-full h-full px-5'
            onClick={() => {
              appendSubNode(node);
            }}
          >
            Add subnode
            <DropdownPlus isHovered={isHovered} />
          </button>
        </div>
        <div className='flex justify-center items-center mr-6 mt-4'>
          <DeleteButton
            callback={() => {
              deleteAllSubNodes(node);
              triggerNodeRerender(node.id);
              triggerRerenderEditor();
            }}
            text='Delete All'
            src=''
          />
        </div>
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

export default SubNodesPage;
