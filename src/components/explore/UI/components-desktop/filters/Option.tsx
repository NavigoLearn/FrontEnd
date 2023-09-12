import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { AnimatePresence, motion } from 'framer-motion';
import { TICK_SRC_BLACK } from '@src/to-be-organized/svg-params';
import Tick from '@components/explore/UI/components-desktop/filters/Tick';

type IOptionProps<T> = {
  fieldName: T;
  callback: (name: T) => void;
  selected: boolean;
};

const Option = <T extends string | number>({
  fieldName,
  selected,
  callback,
}: IOptionProps<T>) => {
  return (
    <li>
      <button
        type='button'
        onClick={() => {
          callback(fieldName);
        }}
        className='flex items-center gap-0 mt-2'
      >
        <div
          className={`rounded-sm border-2 border-placeholderBlack w-4 h-4 flex justify-center items-center ${tailwindTransitionClass}${
            selected && 'bg-white border-primary'
          }`}
          onClick={() => {
            callback(fieldName);
          }}
        >
          <AnimatePresence>
            {selected && (
              <motion.div>
                <Tick width={16} height={16} fill='#3361D8' />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className='text-darkBlue text-sm font-roboto-text text-md font-medium ml-1'>
          {fieldName}
        </span>
      </button>
    </li>
  );
};

export default Option;
