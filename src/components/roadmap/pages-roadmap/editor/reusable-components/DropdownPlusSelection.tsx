import React, { useState, useRef } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import storeEditorSelectedData from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownPlus from '@src/UI-library/svg-components/dropdownplus/DropdownPlus';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useOnEsc } from '@src/hooks/useOnEsc';
import { useInvisibleSearch } from '@src/hooks/useInvisibleSearch';

type IOption<T extends string = string> = {
  id: string;
  name: string;
  callback: (param?: T) => void;
  tooltip?: string;
};

type IDropdownWhiteSelectProps = {
  dropdownName: string;
  options: IOption<string>[];
  dropdownCallback?: (dropdown: boolean) => void;
  src?: string;
};

type IOptionProps = IOption & {
  setDropdown: (isOpen: boolean) => void;
};

const Option = ({ id, name, callback, tooltip, setDropdown }: IOptionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      className='relative'
    >
      <button
        type='button'
        onClick={() => {
          callback();
          setDropdown(false);
        }}
        className={`pointer-events-auto h-10 my-1 text-opacity-60 hover:text-opacity-100 text-darkBlue w-full text-md flex items-center ml-4 ${tailwindTransitionClass}`}
      >
        {name}
      </button>
      <AnimatePresence>
        {tooltip && isHovered && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className='absolute -right-44 w-40 top-0 border-2 border-gray-200 rounded-lg bg-white p-2 text-darkBlue text-sm font-medium text-center'
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

Option.defaultProps = {
  tooltip: null,
};

const DropdownPlusSelection = ({
  dropdownName,
  options,
  dropdownCallback,
}: IDropdownWhiteSelectProps) => {
  const [dropdown, setDropdown] = useState(false);
  const divRef = useRef(null);

  useClickOutside(divRef, () => {
    setDropdown(false);
    dropdownCallback(false);
  });

  useOnEsc(() => {
    setDropdown(false);
    dropdownCallback(false);
  });

  const filterValue = useInvisibleSearch('', [dropdown]);

  return (
    <motion.div
      animate={dropdown ? 'open' : 'closed'}
      className={` w-full bg-white rounded-lg h-10  border-2 border-gray-300 hover:border-darkBlue  ${tailwindTransitionClass} relative`}
      ref={divRef}
    >
      <button
        type='button'
        className='flex items-center w-full h-full px-4'
        onClick={() => {
          setDropdown((prev) => !prev);
          if (dropdownCallback) {
            dropdownCallback(!dropdown);
          }
        }}
      >
        <span className='text-darkBlue text-md font-medium font-roboto-text'>
          {dropdownName}
        </span>
        <div className='absolute right-2'>
          <DropdownPlus />
        </div>
      </button>

      <AnimatePresence>
        {dropdown && (
          <motion.div
            initial={{ opacity: 0, y: '25%' }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: '25%' }}
            transition={{
              duration: 0.25,
            }}
            className={`relative z-20 pointer-events-none translate-y-16 opacity-0 w-full rounded-lg bg-white 
             border-2 border-gray-100 drop-shadow-2xl `}
          >
            {options
              .filter((option) => {
                return option.name
                  .toLowerCase()
                  .includes(filterValue.toLowerCase());
              })
              .map(({ id, name, callback, tooltip }) => {
                return (
                  <Option
                    key={id}
                    id={id}
                    name={name}
                    callback={() => callback(name)}
                    tooltip={tooltip}
                    setDropdown={setDropdown}
                  />
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

DropdownPlusSelection.defaultProps = {
  dropdownCallback: null,
};

export default DropdownPlusSelection;
