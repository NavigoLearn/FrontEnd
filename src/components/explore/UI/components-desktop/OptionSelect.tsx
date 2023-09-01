import React, { useEffect, useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { ARROW_DROPDROWN_SRC } from '@src/to-be-organized/svg-params';

type IOptionSelectProps = {
  name: string;
  options: string[];
  callback: (name: string) => void;
};
const OptionSelect = ({ name, options, callback }: IOptionSelectProps) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setDropdown((prev) => !prev);
          console.log('clicked');
        }}
        className='flex gap-2 relative w-28 pointer-events-auto'
      >
        <span className='text-lg font-roboto-text font-medium text-darkBlue'>
          {name}
        </span>
        <img
          alt='arrow dropdown'
          src={ARROW_DROPDROWN_SRC}
          className={` w-8 h-8 ${
            dropdown && 'rotate-180'
          }${tailwindTransitionClass} absolute right-2`}
        />
      </button>
    </div>
  );
};

export default OptionSelect;
