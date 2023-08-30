import React from 'react';
import { useStore } from '@nanostores/react';
import popup from '@store/roadmap-refactor/popups/popup';
import Report from '@components/roadmap/to-be-organized/popups/Report';
import ConfirmSave from '@components/roadmap/to-be-organized/popups/ConfirmSave';
import ConfirmCancel from '@components/roadmap/to-be-organized/popups/ConfirmCancel';
import ConfirmDelete from '@components/roadmap/to-be-organized/popups/ConfirmDelete';

const Popup = () => {
  const { type } = useStore(popup);
  return (
    <div className='absolute top-0 right-0 h-screen w-screen flex justify-center items-center z-10l bg-transparent pointer-events-none'>
      {type === 'report' && <Report />}
      {type === 'confirmSave' && <ConfirmSave />}
      {type === 'confirmCancel' && <ConfirmCancel />}
      {type === 'confirmDelete' && <ConfirmDelete />}
    </div>
  );
};

export default Popup;
