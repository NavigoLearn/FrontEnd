import React, { useEffect, useRef, useState } from 'react';
import TrashIconCustomizable from '@src/UI-library/svg-components/trash/TrashIconCustomizable';
import { EDIT_SRC, TICK_SRC_BLACK } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { useOnEnter } from '@hooks/useOnEnter';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { useEffectAfterLoad } from '@hooks/useEffectAfterLoad';

type ITemplateProps = {
  name: string;
  onNameChange: (newName: string) => void;
  onTemplateDelete: () => void;
};

const Template = ({ name, onNameChange, onTemplateDelete }: ITemplateProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null);

  useOnEnter(() => {
    setEdit(false);
    // focus the input ref
  });

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

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
          ref={inputRef}
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
          {!edit && (
            <img
              className='w-full h-full'
              alt='edit template button'
              src={EDIT_SRC.src}
            />
          )}
          {edit && (
            <img
              className='w-full h-full'
              alt='edit template button'
              src={TICK_SRC_BLACK.src}
            />
          )}
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
