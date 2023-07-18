import React from 'react';
import { useStore } from '@nanostores/react';
import roadmapPlaceholder from '@store/roadmap-refactor/roadmap-data/roadmap-placeholder';
import { deleteNestedNodeWithId } from '@typescript/roadmap_ref/node/core/data-mutation/delete';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';

const NodeComponent = ({
  parentNestId,
  id,
}: {
  parentNestId: string;
  id: string;
}) => {
  const { nodes } = useStore(roadmapPlaceholder);
  const node = nodes[id];
  const parentNode = nodes[parentNestId];

  return (
    <div>
      <div className='flex gap-10'>
        <div>{node.data.name}</div>
        <button
          onClick={() => {
            console.log('delete node', id);
            deleteNestedNodeWithId(parentNode, id);
            triggerRerenderEditor();
          }}
          className='w-10 h-10 bg-red-500'
        />
      </div>
    </div>
  );
};

export default NodeComponent;
