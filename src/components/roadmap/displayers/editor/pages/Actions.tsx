import React from 'react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { useStore } from '@nanostores/react';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { appendClassicNodeToRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';

const Actions = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='flex flex-col gap-10'>
      <button
        type='button'
        onClick={() => {
          appendClassicNodeToRoadmap(node);
        }}
      >
        Add node
      </button>
      <button
        type='button'
        onClick={() => {
          console.log('delete node');
        }}
      >
        Delete this node
      </button>
    </div>
  );
};

export default Actions;
