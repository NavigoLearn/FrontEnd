import React, { useState } from 'react';
import { type ITextWeight } from '@src/types/roadmap/node/text-types';
import { mutateComponentTextWeight } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import Tick from '@src/components/explore/UI/components-desktop/filters/Tick';

type TextWeightComponentProps = {
  component: ComponentText;
  nodeId: string;
};

const TextWeightComponent = ({
  component,
  nodeId,
}: TextWeightComponentProps) => {
  const textWeightOptions: ITextWeight[] = ['thin', 'normal', 'thick'];

  const [activeButton, setActiveButton] = useState<ITextWeight | null>(
    'normal'
  );

  const handleWeightChange = (weight: ITextWeight) => {
    if (weight !== activeButton) {
      mutateComponentTextWeight(component, weight);
      triggerNodeRerender(nodeId);
      setActiveButton(weight);
    }
  };

  return (
    <div>
      <div className='flex text-placeholder text text-center font-roboto-text text-sm ml-1 absolute'>
        Font weight
      </div>
      <div className='flex gap-2 flex-row mt-4'>
        {textWeightOptions.map((weightOption) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className='checkbox-label' key={weightOption}>
            <input
              type='radio'
              name='fontweight'
              value={weightOption}
              checked={activeButton === weightOption}
              onChange={() => handleWeightChange(weightOption)}
              className='hidden'
            />
            <div className='flex items-center h-8'>
              <div
                className={`w-3 h-3 border-[1.5px] border-gray-200 mr-2 rounded-sm cursor-pointer ${
                  activeButton === weightOption
                    ? 'border-transparent'
                    : 'hover:border-darkBlue transition-all duration-200'
                }`}
              >
                {activeButton === weightOption && (
                  <div className='-translate-y-0.5'>
                    <Tick width={14} height={14} fill='#3361D8' />
                  </div>
                )}
              </div>
              <h2
                className={`font-${
                  // eslint-disable-next-line no-nested-ternary
                  weightOption === 'thin'
                    ? 'light'
                    : weightOption === 'normal'
                    ? 'medium'
                    : 'bold'
                } text-darkBlue font-roboto-text`}
              >
                Aa
              </h2>
            </div>
          </label>
        ))}
        <div className='border-l border-rgb(0,0,0,0.6) mx-2' />
      </div>
    </div>
  );
};

export default TextWeightComponent;
