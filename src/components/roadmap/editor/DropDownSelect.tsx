import React, { useState } from 'react';

const DropDownSelect = ({ components }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (event) => {
    setSelectedItems([...selectedItems, event.target.value]);
  };

  return (
    <div>
      <select onChange={handleSelect}>
        <option>Select a component</option>
        {components.map((Component, index) => (
          <option key={index} value={index}>
            {`Component ${index + 1}`}
          </option>
        ))}
      </select>
      {selectedItems.map((index, i) => {
        const Component = components[index];
        return <Component key={i} name={`Component ${index + 1}`} />;
      })}
    </div>
  );
};

export default DropDownSelect;
