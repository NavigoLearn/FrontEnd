import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';
import React, { useState } from 'react';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/editor-selected-data';

type ITextInputStandard = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  h: string;
  w: string;
};

const TextInputStandard = ({
  label,
  value,
  placeholder,
  onChange,
  h,
  w,
}: ITextInputStandard) => {
  return (
    <div className='relative'>
      <input
        value={value}
        type='text'
        className='border text-[#1A1B50] border-darkBlue rounded-lg hover:border-darkBlue border-placeholderBlack transition-all duration-300 focus:border-darkBlue focus:outline-none px-3'
        placeholder={placeholder}
        style={{
          height: `${h}`,
          width: `${w}`,
        }}
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
        }}
      />
      <div className='absolute -top-3 left-3 px-2 bg-white text-secondary font-roboto-text'>
        {label}
      </div>
    </div>
  );
};

export default TextInputStandard;
