import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import ActionsSystem from '@components/roadmap/displayers/editor/editor-pages/operations-page/actions/ActionsSystem';
import TemplatesSystem from '@components/roadmap/displayers/editor/editor-pages/operations-page/templates/TemplatesSystem';
import { operationsStore } from '@components/roadmap/displayers/editor/editor-pages/operations-page/stores/operations-store';

const Operations = () => {
  const { dropdown } = useStore(operationsStore);

  return (
    <div className='flex flex-col gap-5 justify-start items-start pt-2 relative '>
      <ActionsSystem />
      <TemplatesSystem />
      {dropdown !== 'none' && (
        <div className='absolute pointer-events-auto w-full h-full bg-white  opacity-50 z-10' />
      )}
    </div>
  );
};

export default Operations;
