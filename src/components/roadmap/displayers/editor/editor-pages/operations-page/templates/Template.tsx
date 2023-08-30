import React, { useState } from 'react';
import TrashIconCustomizable from '@src/UI-library/svg-animations/trash/TrashIconCustomizable';
import { EDIT_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

type ITemplateProps = {
  name: string;
  onNameChange: (newName: string) => void;
  onTemplateDelete: () => void;
};

const Template = ({ name, onNameChange, onTemplateDelete }: ITemplateProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className='flex items-center justify-between w-72'>
      {!edit && (
        <h1 className='text-darkBlue font-medium text-md font-roboto-text border-2 border-transparent'>
          {name}
        </h1>
      )}
      {edit && (
        <input
          className='text-darkBlue font-medium text-md font-roboto-text border-2 border-gray-200'
          value={name}
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
        />
      )}
      <section className='flex items-center gap-3'>
        <button
          className={`h-5 w-5 opacity-50 hover:opacity-100${tailwindTransitionClass}`}
          type='button'
          onClick={() => {
            setEdit((prev) => !prev);
          }}
        >
          <img
            className='w-full h-full'
            alt='edit template button'
            src={EDIT_SRC}
          />
        </button>
        <button
          className={`opacity-50 hover:opacity-100${tailwindTransitionClass}`}
          type='button'
          onMouseOver={() => {
            setMouseOver(true);
          }}
          onMouseOut={() => {
            setMouseOver(false);
          }}
          onClick={() => {
            onTemplateDelete();
          }}
        >
          <TrashIconCustomizable
            sizeIcon={40}
            sizeContainer={30}
            hovered={mouseOver}
          />
        </button>
      </section>
    </div>
  );
};

export default Template;
