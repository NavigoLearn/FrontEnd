import React, { useState } from 'react';
import { deleteComponentWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import {
  getComponentTextById,
  getComponentTextText,
} from '@src/typescript/roadmap_ref/node/core/data-get/components';
import {
  mutateComponentTextText,
  mutateComponentTextOpacity,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import TrashIcon from '@src/UI-library/svg-components/trash/TrashIcon';
import DraggableInput from '@src/UI-library/DraggableInput';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import arrowDropdown from '@assets/roadmap/arrow-dropdown.svg';
import TextSizeComponent from '../text-controler/TextSizeComponent';
import TextWeightComponent from '../text-controler/TextWeightComponent';
import TextInputStandard from '../../properties-page/TextInputStandard';

type TitleComponentProps = {
  node: NodeClass;
  id: string;
  name: string;
};

function checkInvalidInput(value: string) {
  const newValue = parseInt(value, 10);
  return typeof newValue !== 'number' || Number.isNaN(newValue);
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
        <TextInputStandard
          label='Text'
          placeholder={name}
          value={getComponentTextText(titleComponent)}
          onChange={(newValue) => {
            mutateComponentTextText(titleComponent, newValue);
            if (node.components.length === 1) rerender();
            triggerNodeRerender(node.id);
          }}
          w='384px'
          h='48px'
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
          src={arrowDropdown.src}
          className={`w-7 h-7 transition-all duration-200 ${
            showElement ? 'rotate-180' : ''
          }`}
        />
      </button>
      {showElement && (
        <div className='flex flex-row ml-1.5'>
          <TextSizeComponent component={titleComponent} nodeId={node.id} />
          <TextWeightComponent component={titleComponent} nodeId={node.id} />
          <div className='h-8 mt-4'>
            <DraggableInput
              name='Opacity'
              value={titleComponent.opacity}
              bounds={{
                min: 0,
                max: 100,
              }}
              onChange={(value) => {
                let displayedValue = parseInt(value, 10);
                if (checkInvalidInput(value)) return;
                if (displayedValue < 0) displayedValue = 0;
                if (displayedValue > 100) displayedValue = 100;

                mutateComponentTextOpacity(titleComponent, displayedValue);
                triggerRerenderEditor();
                triggerNodeRerender(node.id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextComponent;
