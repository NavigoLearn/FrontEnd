import React from 'react';
import {
  addNodeNew,
  removeNode,
} from '@src/typescript/roadmap/roadmap-edit-logic-decorated';

const RemoveNode = ({ id }: { id: string }) => {
  return (
    <div className='h-20 block'>
      <button
        type='button'
        className='h-10 border-2 border-black mt-6'
        onClick={() => {
          // adds a new Node
          removeNode(id);
        }}
      >
        Remove the fucking node
      </button>
    </div>
  );
};

export default RemoveNode;
