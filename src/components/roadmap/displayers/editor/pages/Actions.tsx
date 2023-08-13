import React from 'react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { useStore } from '@nanostores/react';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
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
          // classic delete
          console.log('delete node');
          // delete from other nodes
          // delete from connections and take down connections
          // delete all subchildren/ rereoute them to the other nodes
          // delete from chunks
        }}
      >
        Delete this node
      </button>
    </div>
  );
};

export default Actions;
