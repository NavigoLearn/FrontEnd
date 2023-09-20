import React, { useEffect, useState } from 'react';
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
const OptionSelectMobile = <T extends string | number>({
  name,
  options,
  callback,
  selected,
}: IOptionSelectProps<T>) => {
  return (
    <div>
      <span className='text-md font-roboto-text font-semibold text-darkBlue'>
        {name}
      </span>
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className='flex flex-row gap-x-3 flex-wrap'
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
      </AnimatePresence>
    </div>
  );
};

export default OptionSelectMobile;
