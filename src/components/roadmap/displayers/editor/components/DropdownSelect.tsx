import React, { useState } from 'react';

type IDropdownSelectProps<T extends string> = {
  optionsList: T[];
  onSelect: (element: T) => void;
  text: string;
};

const DropdownSelect = <T extends string>({
  optionsList,
  onSelect,
  text,
}: IDropdownSelectProps<T>) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = (index) => {
    setSelectedItems([...selectedItems, index]);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='relative group mt-5 w-full h-16 rounded-lg bg-gray-200'>
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
        <div className='absolute left-0 top-9  bg-blue-200 w-40  flex flex-col gap-3'>
          {optionsList.map((element, index) => {
            return (
              <button
                onClick={() => {
                  onSelect(element);
                }}
                type='button'
                key={element}
              >
                {element}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;
