import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { mutateComponentDescriptionText } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import {
  getComponentDescriptionById,
  getComponentDescriptionText,
} from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { deleteComponentWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import TrashIcon from '@src/UI-library/svg-animations/trash/TrashIcon';

type DescriptionComponentProps = {
  node: NodeClass;
  id: string;
  name: string;
};
const DescriptionComponent = ({
  node,
  id,
  name,
}: DescriptionComponentProps) => {
  const rerender = useTriggerRerender();
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
          triggerNodeRerender(node.id);
        }}
      />
      <button
        type='button'
        className=' w-8 h-8 mr-6 mb-2'
        onClick={() => {
          deleteComponentWithId(node, id);
          triggerNodeRerender(node.id);
        }}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default DescriptionComponent;
