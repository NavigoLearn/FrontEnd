import React, { useState, useRef } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { motion } from 'framer-motion';
import DropdownPlus from '@src/UI-library/svg-components/dropdownplus/DropdownPlus';

type IDropdownSelectProps<T extends string> = {
  optionsList: T[];
  onSelect: (element: T) => void;
  text: string;
};

type IDropdownOptionsProps<T extends string> = {
  optionsList: T[];
  onSelect: (element: T) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
};

const DropdownOptions = <T extends string>({
  optionsList,
  onSelect,
  setIsOpen,
  isOpen,
}: IDropdownOptionsProps<T>) => {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: -50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const containerRef = useRef(null);
  const height = containerRef.current?.offsetHeight;

  return (
    <div className='absolute w-full left-0 top-14  bg-white flex flex-col rounded-xl z-10'>
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        className='absolute w-full h-12 border-2 border-placeholderBlack left-0 top-0 z-20 rounded-lg pointer-events-none hover:border-darkBlue'
      />
      {optionsList.map((element, index) => {
        return (
          <motion.div
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
            key={element}
          >
            <motion.button
              variants={{
                open: {
                  opacity: 1,
                  transition: {
                    opacity: { duration: 0.6 },
                  },
                },
                closed: {
                  opacity: 0,
                },
              }}
              ref={containerRef}
              custom={height}
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
              className={`text-darkBlue font-roboto-text flex justify-start items-center w-full hover:text-white bg-white hover:bg-highlight pl-3 h-12 ${
                index === 0 && 'rounded-t-xl'
              } ${
                index === optionsList.length - 1 && 'rounded-b-xl'
              } ${tailwindTransitionClass}`}
            >
              {element}
            </motion.button>
            {index !== optionsList.length - 1 && (
              <motion.hr
                variants={{
                  open: {
                    opacity: 1,
                    transition: {
                      opacity: { duration: 0.6 },
                    },
                  },
                  closed: {
                    opacity: 0,
                  },
                }}
                className='bg-gray-200 h-[2px]'
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const DropdownWhiteAdd = <T extends string>({
  optionsList,
  onSelect,
  text,
}: IDropdownSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className='relative group mt-2 w-48 h-12 rounded-lg bg-white border-2 border-gray-200 z-10'
    >
      <button
        onClick={toggleDropdown}
        type='button'
        className='text-darkBlue font-roboto-text text-center flex justify-between items-center w-full h-full px-3'
      >
        {text}
        <DropdownPlus />
      </button>
      <motion.div
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        exit='closed'
      >
        <DropdownOptions
          isOpen={isOpen}
          setIsOpen={(open) => {
            setIsOpen(open);
          }}
          optionsList={optionsList}
          onSelect={onSelect}
        />
      </motion.div>
    </motion.div>
  );
};

export default DropdownWhiteAdd;
