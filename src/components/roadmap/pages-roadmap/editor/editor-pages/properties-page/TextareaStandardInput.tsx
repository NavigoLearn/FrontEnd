import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';
import React, { useState } from 'react';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';

type ITextareaStandardInput = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  h: string;
  w: string;
};

const TextareaStandardInput = ({
  label,
  value,
  placeholder,
  onChange,
  h,
  w,
}: ITextareaStandardInput) => {
  return (
    <div className='relative'>
      <div
        className={` px-2 pt-3 border rounded-lg hover:border-darkBlue border-placeholderBlack transition-all duration-300 focus:border-darkBlue focus:outline-none`}
        style={{
          height: `${h}`,
          width: `${w}`,
        }}
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

export default TextareaStandardInput;
