import React, { useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { motion } from 'framer-motion';

type IDropdownSelectProps<T extends string> = {
  optionsList: T[];
  onSelect: (element: T) => void;
  text: string;
};

type IDropdownOptionsProps<T extends string> = {
  optionsList: T[];
  onSelect: (element: T) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const DropdownOptions = <T extends string>({
  optionsList,
  onSelect,
  setIsOpen,
}: IDropdownOptionsProps<T>) => {
  return (
    // TODO find a way to animate this dropdown
    <motion.div className='absolute w-full left-0 top-20  bg-white flex flex-col  rounded-xl '>
      <div className='absolute w-full h-full border-2 border-gray-500 left-0 top-0 z-20 rounded-xl pointer-events-none' />
      {optionsList.map((element, index) => {
        return (
          <div key={element}>
            <button
              onClick={(e) => {
                onSelect(element);
                // if event if left click closes dropdown
                if (e.button === 0) {
                  setIsOpen(false);
                }
                triggerNodeRerender(editorSelectedData.get().selectedNodeId);
              }}
              onAuxClick={() => {
                onSelect(element);
              }}
              type='button'
              key={element}
              className={`text-darkBlue font-medium text-xl  font-roboto-text flex justify-start items-center w-full hover:text-white bg-white hover:bg-highlight pl-4 h-16 ${
                index === 0 && 'rounded-t-xl'
              } ${
                index === optionsList.length - 1 && 'rounded-b-xl'
              } ${tailwindTransitionClass}`}
            >
              {element}
            </button>
            {index !== optionsList.length - 1 && (
              <hr className='bg-gray-200 h-[2px]' />
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const DropdownComponent = <T extends string>({
  optionsList,
  onSelect,
  text,
}: IDropdownSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div className='relative group mt-5 w-full h-16 rounded-lg bg-gray-200'>
      <button
        onClick={toggleDropdown}
        type='button'
        className='text-xl text-darkBlue font-medium font-roboto-text text-center flex justify-between items-center w-full h-full px-5'
      >
        {text}
        <img
          className='w-9 h-9'
          src='/editor/addCircle.svg'
          alt='alt button for new components'
        />
      </button>

      <div
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <DropdownOptions
          setIsOpen={(open) => {
            setIsOpen(open);
          }}
          optionsList={optionsList}
          onSelect={onSelect}
        />
      </div>
    </motion.div>
  );
};

export default DropdownComponent;
