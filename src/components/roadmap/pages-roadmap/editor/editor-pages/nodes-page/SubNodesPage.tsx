import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import storeEditorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import NodeComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/nodes-page/NodeComponent';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DropdownPlus from '@src/UI-library/svg-components/dropdownplus/DropdownPlus';
import { appendSubNodeId } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { appendSubNode } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import { deleteAllSubNodes } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import DeleteButton from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/DeleteButton';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import DropdownPlusSelection from '../../reusable-components/DropdownPlusSelection';

const SubNodesPage = () => {
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-between h-10 items-center my-1'>
        <div className='relative group w-48 h-10 rounded-lg border-gray-300 hover:border-darkBlue border-2'>
          <button
            type='button'
            className='text-md text-darkBlue font-medium font-roboto-text text-center flex justify-between items-center w-full h-full px-4'
            onClick={() => {
              appendSubNode(node);
            }}
          >
            Add subnode
            <div className='absolute right-2'>
              <DropdownPlus />
            </div>
          </button>
        </div>
        <div className='flex justify-center items-center mr-6'>
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
      <hr className='border-1 border-gray-200 mt-6 mb-2' />
      <div className='flex flex-col gap-3'>
        {node.subNodeIds.map((id) => {
          return (
            <NodeComponent parentNestId={selectedNodeId} id={id} key={id} />
          );
        })}
      </div>
    </div>
  );
};

export default SubNodesPage;
