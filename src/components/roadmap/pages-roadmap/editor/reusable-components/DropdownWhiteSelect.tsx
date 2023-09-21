import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { useClickOutside } from '@hooks/useClickOutside';
import { useInvisibleSearch } from '@hooks/useInvisibleSearch';
import { useOnEsc } from '@hooks/useOnEsc';
import arrowDropdown from '@assets/roadmap/arrow-dropdown.svg';

type IOption = {
  id: string;
  name: string;
  callback: () => void;
  tooltip?: string;
};

type IDropdownWhiteSelectProps = {
  dropdownName: string;
  options: IOption[];
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

const DropdownWhiteSelect = ({
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
    <div
      className={` w-full bg-white rounded-lg h-10  border-2 border-gray-300 hover:border-darkBlue  ${tailwindTransitionClass} relative`}
      ref={divRef}
    >
      <button
        type='button'
        className='flex items-center w-full h-full px-4'
        onClick={(e) => {
          setDropdown((prev) => !prev);
          if (dropdownCallback) {
            dropdownCallback(!dropdown);
          }
          e.stopPropagation();
        }}
      >
        <span className='text-darkBlue text-md font-medium font-roboto-text'>
          {dropdownName}
        </span>
        <img
          alt='arrow dropdown'
          src={arrowDropdown.src}
          className={` w-8 h-8 ${
            dropdown && 'rotate-180'
          }${tailwindTransitionClass} absolute right-2`}
        />
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
                    callback={callback}
                    tooltip={tooltip}
                    setDropdown={setDropdown}
                  />
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DropdownWhiteSelect.defaultProps = {
  dropdownCallback: null,
};

export default DropdownWhiteSelect;
