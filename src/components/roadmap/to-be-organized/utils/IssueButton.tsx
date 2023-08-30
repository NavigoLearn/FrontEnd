import React, { useState } from 'react';

const IssueButton = () => {
  const [active, setActive] = useState(true);
  const leftBorders = 'rounded-tl-full rounded-bl-full';
  const rightBorders = 'rounded-tr-full rounded-br-full';
  const classActive =
    ' bg-blue-600 w-12 md:w-20 text-center h-8 md:h-10 py-1 md:py-2 text-white font-medium text-sm md:text-core';
  const classInactive =
    'border-2 border-blue-600 w-12 h-8 md:h-10 md:w-20 text-center py-1 md:py-2 font-medium text-center text-sm md:text-core';
  return (
    <div className='flex relative'>
      <button
        type='button'
        className={`${active ? classActive : classInactive} ${leftBorders} select-none`}
        onClick={() => {
          setActive(true);
        }}
      >
        ALL
      </button>
      <button
        type='button'
        className={`${active ? classInactive : classActive} ${rightBorders} select-none`}
        onClick={() => {
          setActive(false);
        }}
      >
        Yours
      </button>
    </div>
  );
};

export default IssueButton;
