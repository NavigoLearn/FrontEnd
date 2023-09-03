import React, { useState } from 'react';
import { ITextSize } from '@src/types/roadmap/node/text-types';
import { mutateComponentTextSize } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import Tick from '@src/components/explore/UI/components-desktop/filters/Tick';

type TextSizeComponentProps = {
  component: ComponentText;
  nodeId: string;
  selectedSize: ITextSize;
};

const TextSizeComponent = ({
  component,
  nodeId,
  selectedSize,
}: TextSizeComponentProps) => {
  const textSizeOptions: ITextSize[] = ['small', 'normal', 'large'];

  const [activeButton, setActiveButton] = useState<ITextSize | null>('normal');

  const handleSizeChange = (size: ITextSize) => {
    mutateComponentTextSize(component, size);
    triggerNodeRerender(nodeId);
    setActiveButton(size);
  };

  return (
    <div>
      <div className='flex text-placeholder text text-center font-roboto-text mb-2'>
        Font size
      </div>
      <div className='flex gap-2 flex-row'>
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
            <div className='flex items-center h-12'>
              <div
                className={`w-4 h-4 border-[1px] border-black mr-2 cursor-pointer ${
                  activeButton === sizeOption ? 'border-transparent' : ''
                }`}
              >
                {activeButton === sizeOption && (
                  <div className='-translate-y-1'>
                    <Tick width={18} height={18} fill='#3361D8' />
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
      </div>
    </div>
  );
};

export default TextSizeComponent;
