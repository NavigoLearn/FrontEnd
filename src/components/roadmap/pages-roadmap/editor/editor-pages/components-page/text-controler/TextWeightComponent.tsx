import React, { useState } from 'react';
import { ITextWeight } from '@src/types/roadmap/node/text-types';
import { mutateComponentTextWeight } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import Tick from '@src/components/explore/UI/components-desktop/filters/Tick';

type TextWeightComponentProps = {
  component: ComponentText;
  nodeId: string;
  selectedWeight: ITextWeight;
};

const TextWeightComponent = ({
  component,
  nodeId,
  selectedWeight,
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
      <div className='flex text-placeholder text text-center font-roboto-text mb-2'>
        Font weight
      </div>
      <div className='flex gap-2 flex-row'>
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
            <div className='flex items-center h-12'>
              <div
                className={`w-4 h-4 border-[1px] border-black mr-2 cursor-pointer ${
                  activeButton === weightOption ? 'border-transparent' : ''
                }`}
              >
                {activeButton === weightOption && (
                  <div className='-translate-y-1'>
                    <Tick width={18} height={18} fill='#3361D8' />
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
      </div>
    </div>
  );
};

export default TextWeightComponent;
