import React from 'react';
import { useStore } from '@nanostores/react';
import EditorTextSectionM from '@components/home/mobile/sections/editor/sections/editor-text/EditorTextSectionM';
import EditorDemonstrationM from '@components/home/mobile/sections/editor/sections/editor-demonstration/EditorDemonstrationM';

const EditorSectionM = () => {
  // const {} = useStore();

  return (
    <div className='flex flex-col mb-10'>
      <EditorTextSectionM />
      <div className='w-full'>
        <EditorDemonstrationM />
      </div>
    </div>
  );
};

export default EditorSectionM;
