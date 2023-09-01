import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';
import React, { useState } from 'react';
import { mutateActionLink } from '@src/typescript/roadmap_ref/node/core/actions/mutate';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/editor-selected-data';

type SpecialInputProps = {
  label: string;
  actions: ActionsClass;
  placeholder: string;
};

const SpecialInput = ({ label, actions, placeholder }: SpecialInputProps) => {
  return (
    <div className='relative'>
      <input
        value={actions.additionalData.link}
        type='text'
        className='h-10 w-52 border-2 text-[#1A1B50] border-darkBlue rounded-lg hover:border-darkBlue border-placeholderBlack transition-all duration-300 focus:border-darkBlue focus:outline-none px-3'
        placeholder={placeholder}
        onChange={(e) => {
          mutateActionLink(actions, e.target.value);
          triggerRerenderEditor();
        }}
      />
      <div className='absolute -top-3 left-3 px-2 bg-white text-secondary font-roboto-text'>
        {label}
      </div>
    </div>
  );
};

export default SpecialInput;
