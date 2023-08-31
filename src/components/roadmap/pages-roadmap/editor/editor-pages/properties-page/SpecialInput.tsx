import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';
import React, { useState } from 'react';
import { mutateActionLink } from '@src/typescript/roadmap_ref/node/core/actions/mutate';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/editor-selected-data';

type SpecialInputProps = {
  label: string;
  actions: ActionsClass;
};

const SpecialInput = ({ label, actions }: SpecialInputProps) => {
  return (
    <div>
      <input
        value={actions.additionalData.link}
        type='text'
        className='h-10 w-52 border-2 border-darkBlue'
        placeholder={label}
        onChange={(e) => {
          mutateActionLink(actions, e.target.value);
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};

export default SpecialInput;
