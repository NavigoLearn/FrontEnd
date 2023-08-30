import React from 'react';
import Popup from '@components/roadmap/to-be-organized/popups/Popup';

const DynamicElementsDisplayManager = () => {
  return (
    <div className='w-full h-full absolute top-0 left-0'>
      <Popup />
    </div>
  );
};

export default DynamicElementsDisplayManager;
