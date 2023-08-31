import React from 'react';
import PopupTemplates from '@components/roadmap/to-be-organized/popups/PopupTemplates';

const DynamicElementsDisplayManager = () => {
  return (
    <div className='w-full h-full absolute top-0 left-0'>
      <PopupTemplates />
    </div>
  );
};

export default DynamicElementsDisplayManager;
