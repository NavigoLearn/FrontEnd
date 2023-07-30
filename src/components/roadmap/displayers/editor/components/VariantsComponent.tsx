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
    <div className='flex gap-2 ml-5'>
      {variants.map((variant) => {
        return (
          <button
            key={variant.name}
            type='button'
            className='flex flex-row gap-0 items-center justify-center'
            onClick={variant.callback}
          >
            <div
              className='w-4 h-4 '
              style={{ backgroundColor: variant.color }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default VariantsComponent;
