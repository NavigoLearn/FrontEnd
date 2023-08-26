import React, { useState } from 'react';
import { mutateComponentTextSize } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';

type TextSizeComponentProps = {
  component: ComponentText;
  nodeId: string;
};

const TextSizeComponent = ({ component, nodeId }: TextSizeComponentProps) => {
  const [selectedSize, setSelectedSize] = useState<'big' | 'medium' | 'small'>(
    'medium'
  );

  return (
    <div className='flex-row flex gap-2 w-full items-center'>
      <div className='items-center flex flex-col w-20'>
        <h5 className='text-darkBlue font-medium text-md font-roboto-text justify-center'>
          Big
        </h5>
        <button
          className={`w-20 h-20 p-3 border-2 border-black ${
            selectedSize === 'big'
              ? 'bg-primary bg-opacity-10 border-2 border-primary'
              : ''
          }`}
          type='button'
          onClick={() => {
            setSelectedSize('big');
            mutateComponentTextSize(component, 'large');
            triggerNodeRerender(nodeId);
          }}
        >
          <h2 className='flex text-darkBlue font-roboto-text font-extrabold text-lg'>
            Aa
          </h2>
          <h3 className='flex text-secondary font-roboto-text font-medium text-base'>
            Aa
          </h3>
        </button>
      </div>
      <div className='items-center text-center flex flex-col w-20'>
        <h5 className='text-darkBlue font-medium text-md font-roboto-text justify-center'>
          Medium
        </h5>
        <button
          className={`w-20 h-20 p-3 border-2 border-black ${
            selectedSize === 'medium'
              ? 'bg-primary bg-opacity-10 border-2 border-primary'
              : ''
          }`}
          type='button'
          onClick={() => {
            setSelectedSize('medium');
            mutateComponentTextSize(component, 'normal');
            triggerNodeRerender(nodeId);
          }}
        >
          <h2 className='flex text-darkBlue font-roboto-text font-bold text-base'>
            Aa
          </h2>
          <h3 className='flex text-secondary font-medium text-sm'>Aa</h3>
        </button>
      </div>
      <div className='items-center text-center flex flex-col w-20'>
        <h5 className='text-darkBlue font-medium text-md font-roboto-text justify-center'>
          Small
        </h5>
        <button
          className={`w-20 h-20 p-3 border-2 border-black ${
            selectedSize === 'small'
              ? 'bg-primary bg-opacity-10 border-2 border-primary'
              : ''
          }`}
          type='button'
          onClick={() => {
            setSelectedSize('small');
            mutateComponentTextSize(component, 'small');
            triggerNodeRerender(nodeId);
          }}
        >
          <h2 className='flex text-darkBlue font-roboto-text font-semibold text-sm'>
            Aa
          </h2>
          <h3 className='flex text-secondary font-medium text-xs'>Aa</h3>
        </button>
      </div>
    </div>
  );
};

export default TextSizeComponent;
