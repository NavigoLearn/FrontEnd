import React from 'react';
import { deleteComponentWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import {
  getComponentTitleById,
  getComponentTitleText,
} from '@src/typescript/roadmap_ref/node/core/data-get/components';
import {
  mutateComponentTitleText,
  mutateComponentTitleWidth,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import TrashIcon from '@src/UI-library/svg-animations/trash/TrashIcon';
import DraggableInput from '@src/UI-library/DraggableInput';

type TitleComponentProps = {
  node: NodeClass;
  id: string;
  name: string;
};

function checkInvalidInput(value: string) {
  const newValue = parseInt(value, 10);
  if (typeof newValue !== 'number' || Number.isNaN(newValue)) return true;
  return false;
}

const TitleComponent = ({ node, id, name }: TitleComponentProps) => {
  const rerender = useTriggerRerender();
  // is opened and node is selected
  const titleComponent = getComponentTitleById(node, id);
  // cache component

  return (
    <div>
      <div className='flex w-full outline-black'>
        <input
          className={`flex-grow border-2 border-gray-400 h-16 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
          placeholder={name}
          value={getComponentTitleText(titleComponent)}
          onChange={(event) => {
            const { value } = event.target;
            mutateComponentTitleText(titleComponent, value);
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
      <div className='flex flex-row w-full'>
        <DraggableInput
          name='W'
          value={titleComponent.width}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            if (newValue < 0) return;
            mutateComponentTitleWidth(titleComponent, newValue);
            rerender();
            triggerNodeRerender(node.id);
          }}
        />
        <DraggableInput
          name='H'
          value={titleComponent.height}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            if (newValue < 0) return;
            titleComponent.height = newValue;
            rerender();
            triggerNodeRerender(node.id);
          }}
        />
      </div>
    </div>
  );
};

export default TitleComponent;
