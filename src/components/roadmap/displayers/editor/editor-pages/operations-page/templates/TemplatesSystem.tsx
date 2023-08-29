import React, { useState } from 'react';
import AddTemplateButton from '@components/roadmap/displayers/editor/editor-pages/operations-page/templates/AddTemplateButton';
import SearchTemplate from '@components/roadmap/displayers/editor/editor-pages/operations-page/templates/SearchTemplate';
import Template from '@components/roadmap/displayers/editor/editor-pages/operations-page/templates/Template';

const TemplatesSystem = () => {
  const [hovered, setHovered] = useState(false);
  const templates = [
    'template 1',
    'the unholy node',
    'another noe',
    'template 2',
  ];

  return (
    <div>
      <div className='flex gap-10 items-center'>
        <h1 className='text-secondary text-darkBlue font-normal text-lg   '>
          Templates
        </h1>
        <AddTemplateButton />
      </div>
      <div className='mt-6 '>
        <SearchTemplate />
      </div>
      <div className='flex flex-col pt-4'>
        {templates.map((name) => {
          return (
            <Template
              key={name}
              name={name}
              onNameChange={(newName: string) => {
                console.log(newName);
              }}
              onTemplateDelete={() => {
                console.log('delete');
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TemplatesSystem;
