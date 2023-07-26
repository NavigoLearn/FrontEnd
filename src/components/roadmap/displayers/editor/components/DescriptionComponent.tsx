import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { mutateComponentDescriptionText } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import {
  getComponentDescriptionById,
  getComponentDescriptionText,
} from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { deleteComponentWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';

type DescriptionComponentProps = {
  id: string;
  name: string;
};
const DescriptionComponent = ({ id, name }: DescriptionComponentProps) => {
  const rerender = useTriggerRerender();
  const { node } = useStore(editorSelectedData); // since title component is used means editor
  // is opened and node is selected
  const descriptionComponent = getComponentDescriptionById(node, id);
  return (
    <div className='flex gap-2 w-full outline-2 outline-black'>
      <textarea
        className={`flex-grow border-2 border-gray-400 h-48  rounded-lg text-darkBlue text-lg pl-4 pt-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        placeholder={name}
        value={getComponentDescriptionText(descriptionComponent)}
        onChange={(event) => {
          const { value } = event.target;
          mutateComponentDescriptionText(descriptionComponent, value);
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

export default DescriptionComponent;
