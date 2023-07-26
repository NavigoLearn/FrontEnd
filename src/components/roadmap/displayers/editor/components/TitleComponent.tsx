import React, { useMemo } from 'react';
import { deleteComponentWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import {
  getComponentTitleById,
  getComponentTitleText,
} from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { mutateComponentTitleText } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { useTriggerRerender } from '@hooks/useTriggerRerender';

type TitleComponentProps = {
  id: string;
  name: string;
};
const TitleComponent = ({ id, name }: TitleComponentProps) => {
  const rerender = useTriggerRerender();
  const { node } = useStore(editorSelectedData); // since title component is used means editor
  // is opened and node is selected
  const titleComponent = useMemo(() => getComponentTitleById(node, id), [id]);
  // cache component

  return (
    <div className='flex gap-2 w-full outline-2 outline-black'>
      <input
        className={`flex-grow border-2 border-gray-400 h-16 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        placeholder={name}
        value={getComponentTitleText(titleComponent)}
        onChange={(event) => {
          const { value } = event.target;
          mutateComponentTitleText(titleComponent, value);
          rerender();
        }}
      />
      <button
        type='button'
        className=' w-8 h-8 mx-4 mb-2'
        onClick={() => {
          deleteComponentWithId(node, id);
        }}
      >
        <img
          src='/editor/deleteBin.svg'
          alt='Delete button for title component'
          className='w-full h-full'
        />
      </button>
    </div>
  );
};

export default TitleComponent;
