import React, { useState } from 'react';
import { deleteComponentWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import {
  getComponentTextById,
  getComponentTextText,
} from '@src/typescript/roadmap_ref/node/core/data-get/components';
import {
  mutateComponentTextText,
  mutateComponentTextWidth,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import TrashIcon from '@src/UI-library/svg-components/trash/TrashIcon';
import DraggableInput from '@src/UI-library/DraggableInput';
import { nodeNameSyncer } from '@src/typescript/roadmap_ref/node/misc';
import TextSizeComponent from '../text-controler/TextSizeComponent';
import TextWeightComponent from '../text-controler/TextWeightComponent';
import SpecialInput from '../../properties-page/SpecialInput';

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

const TextComponent = ({ node, id, name }: TitleComponentProps) => {
  const rerender = useTriggerRerender();
  const titleComponent = getComponentTextById(node, id);
  const [showElement, setShowElement] = useState(false);
  const toggleShowElement = () => {
    setShowElement(!showElement);
  };

  return (
    <div>
      <div className='flex w-full outline-black mt-2'>
        <SpecialInput
          label='Text'
          placeholder={name}
          value={getComponentTextText(titleComponent)}
          onChange={(newValue) => {
            mutateComponentTextText(titleComponent, newValue);
            if (node.components.length === 1) rerender();
            triggerNodeRerender(node.id);
          }}
          w='96'
          h='12'
        />
        <button
          type='button'
          className='w-8 h-8 ml-1 -mt-4'
          onClick={() => {
            deleteComponentWithId(node, id);
            triggerNodeRerender(node.id);
          }}
        >
          <TrashIcon />
        </button>
      </div>
      <button
        type='button'
        className='flex items-center ml-2'
        onClick={toggleShowElement}
      >
        <span className='text-darkBlue text-sm font-medium font-roboto-text my-2'>
          Show Properties
        </span>
        <img
          alt='arrow dropdown'
          src='/roadmap/arrow-dropdown.svg'
          className={`w-7 h-7 transition-all duration-200 ${
            showElement ? 'rotate-180' : ''
          }`}
        />
      </button>
      {showElement && (
        <div className='flex flex-row ml-1.5'>
          <TextSizeComponent component={titleComponent} nodeId={node.id} />
          <TextWeightComponent component={titleComponent} nodeId={node.id} />
        </div>
      )}
    </div>
  );
};

export default TextComponent;
