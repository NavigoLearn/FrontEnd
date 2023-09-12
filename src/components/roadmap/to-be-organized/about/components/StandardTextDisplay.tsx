import React, { useState } from 'react';

type IStandardTextDisplay = {
  label: string;
  value: string;
  h: string;
  w: string;
};

const StandardTextDisplay = ({ label, value, h, w }: IStandardTextDisplay) => {
  return (
    <div className='relative'>
      <div
        className='text-darkBlue font-roboto-text font-medium text-lg rounded-lg transition-all duration-300 break-words whitespace-pre-line'
        style={{
          height: `${h}`,
          width: `${w}`,
          maxHeight: '20rem',
          overflowY: 'auto',
        }}
      >
        {value}
      </div>
      <div className='absolute -top-6 -left-2 px-2 bg-white text-secondary font-roboto-text'>
        {label}
      </div>
    </div>
  );
};

export default StandardTextDisplay;
