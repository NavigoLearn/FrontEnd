import React, { useState } from 'react';
import { type ITextSize } from '@src/types/roadmap/node/text-types';
import { mutateComponentTextSize } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import Tick from '@src/components/explore/UI/components-desktop/filters/Tick';

type TextSizeComponentProps = {
  component: ComponentText;
  nodeId: string;
};

const TextSizeComponent = ({ component, nodeId }: TextSizeComponentProps) => {
  const textSizeOptions: ITextSize[] = ['small', 'normal', 'large'];

  const [activeButton, setActiveButton] = useState<ITextSize | null>('normal');

  const handleSizeChange = (size: ITextSize) => {
    mutateComponentTextSize(component, size);
    triggerNodeRerender(nodeId);
    setActiveButton(size);
  };

  return (
    <div>
      <div className='flex text-placeholder font-roboto-text text-sm ml-1 absolute'>
        Font size
      </div>
      <div className='flex gap-2 flex-row mt-4'>
        {textSizeOptions.map((sizeOption) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className='checkbox-label' key={sizeOption}>
            <input
              type='radio'
              name='fontsize'
              value={sizeOption}
              checked={activeButton === sizeOption}
              onChange={() => handleSizeChange(sizeOption)}
              className='hidden'
            />

            <div className='flex items-center h-8'>
              <div
                className={`w-3 h-3 border-[1.5px] border-gray-200 rounded-sm mr-2 cursor-pointer ${
                  activeButton === sizeOption
                    ? 'border-transparent'
                    : 'hover:border-darkBlue transition-all duration-200'
                }`}
              >
                {activeButton === sizeOption && (
                  <div className='-translate-y-1'>
                    <Tick width={14} height={14} fill='#3361D8' />
                  </div>
                )}
              </div>
              <h2
                className={`text-${
                  // eslint-disable-next-line no-nested-ternary
                  sizeOption === 'small'
                    ? 'base'
                    : sizeOption === 'normal'
                    ? 'lg'
                    : 'xl'
                } text-darkBlue font-roboto-text`}
              >
                Aa
              </h2>
            </div>
          </label>
        ))}
        <div className='border-l border-rgb(0,0,0,0.6) mx-2 mr-4' />
      </div>
    </div>
  );
};

export default TextSizeComponent;
