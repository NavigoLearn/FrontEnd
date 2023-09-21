import React from 'react';
import { useStore } from '@nanostores/react';
import storeEditorSelectedData from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DeleteButton from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/DeleteButton';
import { deleteProtocolNodeFromRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import { closeEditorProtocol } from '@src/to-be-organized/node-rendering-stuff/actions-manager';

const ActionsSubNode = () => {
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='w-full flex justify-center items-center pt-5'>
      <DeleteButton
        callback={() => {
          deleteProtocolNodeFromRoadmap(node);
          closeEditorProtocol();
        }}
        text='Delete Node'
        space
      />
    </div>
  );
};

export default ActionsSubNode;
