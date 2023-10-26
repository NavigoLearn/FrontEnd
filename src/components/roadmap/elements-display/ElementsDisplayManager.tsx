import React from 'react';
import StaticElementsDisplayManager from '@components/roadmap/elements-display/static/StaticElementsDisplayManager';

const ElementsDisplayManager = () => {
  return (
    <div className='pointer-events-none'>
      <div className='absolute w-full h-full top-0 left-0'>
        <StaticElementsDisplayManager />
      </div>
    </div>
  );
};

export default ElementsDisplayManager;
