import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';
import React, { useState } from 'react';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/editor-selected-data';

type SpecialInputProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  h: string;
  w: string;
};

const SpecialTextArea = ({
  label,
  value,
  placeholder,
  onChange,
  h,
  w,
}: SpecialInputProps) => {
  return (
    <div className='relative'>
      <div
        className={`h-${h} w-${w} px-2 pt-3 border rounded-lg hover:border-darkBlue border-placeholderBlack transition-all duration-300 focus:border-darkBlue focus:outline-none`}
      >
        <textarea
          value={value}
          className='w-full h-full text-[#1A1B50] bg-transparent border-none resize-none focus:outline-none'
          placeholder={placeholder}
          onChange={(e) => {
            const newValue = e.target.value;
            onChange(newValue);
          }}
        />
      </div>
      <div className='absolute -top-3 left-3 px-2 bg-white text-secondary font-roboto-text'>
        {label}
      </div>
    </div>
  );
};

export default SpecialTextArea;
