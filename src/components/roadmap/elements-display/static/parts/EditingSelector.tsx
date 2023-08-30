import React, { useState } from 'react';
import NodeEditSvg from '@components/roadmap/elements-display/static/parts/components/NodeEditSvg';
import ConnectionEditSvg from '@components/roadmap/elements-display/static/parts/components/ConnectionEditSvg';
import editingState, {
  getEditingState,
  setEditingState,
} from '@store/roadmap-refactor/editing/editing-state';
import { useStore } from '@nanostores/react';

const EditingSelector = () => {
  useStore(editingState);
  const editState = getEditingState();

  return (
    <div className='relative h-10 rounded-md bg-white shadow-darkBlue drop-shadow-sm flex justify-center items-center gap-4 '>
      <div className='flex relative items-center justify-center pointer-events-auto cursor-pointer'>
        <NodeEditSvg
          callback={() => {
            setEditingState('nodes');
          }}
          selected={editState === 'nodes'}
          size={45}
        />
      </div>
      <div className='flex items-center justify-center pointer-events-auto pr-4 cursor-pointer'>
        <ConnectionEditSvg
          callback={() => {
            setEditingState('connections');
          }}
          selected={editState === 'connections'}
          size={1.35}
        />
      </div>
      <div className='absolute w-full h-2'>
        <div className='absolute top-8 text-sm  left-1/2 -translate-x-1/2 font-roboto-text text-placeholder w-40 flex justify-center items-center '>
          Editing {editState}
        </div>
      </div>
    </div>
  );
};

export default EditingSelector;
