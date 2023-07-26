import React, { useState } from 'react';
import arrow from '@assets/arrow-up.svg';
import { changeNodeLevel } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import { LevelTypes, levelTypesArray } from '@type/roadmap/old/level-types';
import { isLevelType } from '@type/roadmap/old/typecheckers';

// handles the level change roadmap-roadmap-data for every node
const DropdownLevel = ({ id, level }: { id: string; level: LevelTypes }) => {
  const [selectedOption, setSelectedOption] = useState(level);
  const [open, setOpen] = useState(false);
  const handleChange = (value: string) => {
    if (!isLevelType(value)) throw new Error('Invalid level type');
    const err = changeNodeLevel(id, value);

    if (err === 'ok') {
      setSelectedOption(value);
    }
    setOpen(false);
  };

  return (
    <div className='w-16  bg-transparent outline-none flex justify-center '>
      <div className=' text-center w-24 '>
        <div className='flex flex-col absolute  bottom-7 right-0'>
          {open && (
            <>
              {levelTypesArray.map((option) => (
                <button
                  type='button'
                  key={option}
                  className={` py-1 text-placeholder hover:text-main transition-colors text-sm`}
                  onClick={() => {
                    handleChange(option);
                  }}
                >
                  {option}
                </button>
              ))}
            </>
          )}
        </div>
        <button
          type='button'
          className='flex relative text-center justify-center w-full bg-transparent outline-none '
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <div className=' text-secondary text-sm  mb-1  relative'>
            {selectedOption}

            <img
              draggable='false'
              src={arrow}
              alt='chose element'
              className={` w-2 opacity-50 transition-transform absolute -right-4 bottom-1   ${
                open ? ' rotate-180' : ' rotate-0'
              }  `}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DropdownLevel;
