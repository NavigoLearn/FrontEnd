import React, { useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { ARROW_DROPDROWN_SRC } from '@src/to-be-organized/svg-params';
import { AnimatePresence, motion } from 'framer-motion';
import Option from '@components/explore/UI/components-desktop/filters/Option';

type IOptionSelectProps<T> = {
  name: string;
  options: T[];
  callback: (value: T) => void;
  selected: T;
};
const OptionSelect = <T extends string | number>({
  name,
  options,
  callback,
  selected,
}: IOptionSelectProps<T>) => {
  const [dropdown, setDropdown] = useState(true);

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
        className='flex gap-2 relative  pointer-events-auto'
      >
        <span className='text-md font-roboto-text font-semibold text-darkBlue'>
          {name}
        </span>
        <img
          alt='arrow dropdown'
          src={ARROW_DROPDROWN_SRC.src}
          className={` w-8 h-8 ${
            dropdown && 'rotate-180'
          }${tailwindTransitionClass} absolute -right-8 -top-1`}
        />
      </button>
      <AnimatePresence>
        {dropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='mt-2'
          >
            {options.map((optionName) => {
              const isSelected = selected === optionName;
              return (
                <Option
                  key={optionName}
                  callback={callback}
                  fieldName={optionName}
                  selected={isSelected}
                />
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptionSelect;
