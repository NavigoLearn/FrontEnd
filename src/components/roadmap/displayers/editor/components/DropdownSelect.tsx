import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    setIsOpen(isHovered);
  }, [isHovered]);

  return (
    <div className=' relative group flex' onMouseEnter={handleMouseEnter}>
      <button
        onClick={toggleDropdown}
        onMouseEnter={handleMouseEnter}
        type='button'
        className='text-lg text-black font-semibold text-center flex'
      >
        {text}
        <div className=' text-black ml-5 text-2xl'>+</div>
      </button>

      <div
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className='absolute left-0 top-9 border-2 border-blue-500 bg-blue-200 w-40  flex flex-col gap-3'
          onMouseLeave={handleMouseLeave}
        >
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
