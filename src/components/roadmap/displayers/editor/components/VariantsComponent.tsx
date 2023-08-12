import React from 'react';

type IVariant = {
  callback: () => void;
  name: string;
  color: string;
};
type IVariantsComponentProps = {
  variants: IVariant[];
};

const VariantsComponent = ({ variants }: IVariantsComponentProps) => {
  return (
    <div className='flex gap-2'>
      {variants.map((variant) => {
        return (
          <button
            key={variant.name}
            type='button'
            className='flex flex-row gap-0 items-center justify-center'
            onClick={variant.callback}
          >
            <div
              className='w-20 h-8 text-white font-medium font-roboto-text text-sm rounded-md text-left flex items-center'
              style={{ backgroundColor: variant.color }}
            >
              {variant.name}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default VariantsComponent;
