import React from 'react';
import { divWrapper } from '@components/roadmap/tabs/utils/logic';
import { saveEditingProtocol } from '@src/typescript/roadmap/utils2';
import { setConfirmSave } from '@store/roadmap-refactor/popups/popup';

const ConfirmSave = () => {
  return (
    <div className=' relative z-40 rounded-lg w-full  md:w-[600px] h-[200px] shadow-standard bg-white pointer-events-auto '>
      {divWrapper(
        <div className='mt-4 text-main font-semibold text-lg text-center'>
          Are you sure you want to save the changes you made to this roadmap?
        </div>
      )}
      <div className='w-full absolute bottom-8 flex justify-center gap-4'>
        <button
          type='button'
          className='bg-main text-white rounded-xl px-6 py-1 bg-primary font-medium '
          onClick={() => {
            saveEditingProtocol();
            setConfirmSave();
          }}
        >
          Save Changes
        </button>
        <button
          type='button'
          className='text-secondary font-medium text-sm'
          onClick={() => {
            setConfirmSave();
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ConfirmSave;
