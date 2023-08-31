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
    <div className='relative w-full h-full rounded-md bg-white shadow-darkBlue drop-shadow-sm flex justify-center items-center gap-2 '>
      <div className='flex relative items-center justify-center pointer-events-auto cursor-pointer'>
        <NodeEditSvg
          callback={() => {
            setEditingState('nodes');
          }}
          selected={editState === 'nodes'}
          size={30}
        />
      </div>
      <div className='flex items-center justify-center pointer-events-auto  cursor-pointer pr-2'>
        <ConnectionEditSvg
          callback={() => {
            setEditingState('connections');
          }}
          selected={editState === 'connections'}
          size={1.2}
        />
      </div>
      <div className='absolute w-full h-2'>
        <div className='absolute top-0 text-sm right-0 translate-x-full pl-2 -translate-y-1.5 font-roboto-text text-placeholder w-40'>
          Editing {editState}
        </div>
      </div>
    </div>
  );
};

export default EditingSelector;
