import React, { useState } from 'react';

const DropDownSelect = ({ components }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (index) => {
    setSelectedItems([...selectedItems, index]);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='h-[100%] overflow-y-auto'>
      <button onClick={toggleDropdown} type='button'>
        Select a component
      </button>
      <div />
      {isOpen && (
        <div className='flex flex-col'>
          {components.map((Component, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              type='button'
            >
              {Component.name}
            </button>
          ))}
        </div>
      )}
      {selectedItems.map((index, i) => {
        const Component = components[index];
        return <Component key={i} name={Component.name} />;
      })}
    </div>
  );
};

export default DropDownSelect;
