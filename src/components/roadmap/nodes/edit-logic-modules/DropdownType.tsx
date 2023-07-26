import React, { useState } from 'react';
import arrow from '@assets/arrow-up.svg';
import { changeNodeType } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import {
  NodeIdentifierTypes,
  nodeIdentifierTypesArray,
} from '@type/roadmap/old/nodes';
import { isValidNodeType } from '@type/roadmap/old/typecheckers';

// handles all the node type change roadmap-roadmap-data for every node
const DropdownType = ({
  id,
  type,
}: {
  id: string;
  type: NodeIdentifierTypes;
}) => {
  const [selectedOption, setSelectedOption] = useState(type);
  const [open, setOpen] = useState(false);

  const handleChange = (value) => {
    if (isValidNodeType(value)) {
      const ok = changeNodeType(id, value);
      if (ok === 'ok') {
        setSelectedOption(value);
      }
      setOpen(false);
    }
  };

  return (
    <div className='w-24  bg-transparent outline-none flex justify-center '>
      <div className=' text-center w-24 '>
        <div className='flex flex-col absolute  bottom-7 right-3'>
          {open && (
            <>
              {nodeIdentifierTypesArray.map((option) => (
                <button
                  type='button'
                  key={option}
                  className={` py-1 text-placeholder hover:text-main transition-colors`}
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
          <div className=' text-secondary text-md mb-1  relative'>
            {selectedOption}

            <img
              draggable='false'
              src={arrow}
              alt='chose element'
              className={` w-3 opacity-50 transition-transform absolute -right-5 bottom-1   ${
                open ? ' rotate-180' : ' rotate-0'
              }  `}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DropdownType;
