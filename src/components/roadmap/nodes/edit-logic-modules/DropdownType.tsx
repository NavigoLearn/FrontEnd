import React, { useState } from 'react';
import { changeNodeType } from '@store/roadmap_edit';
import { NodeIdentifierTypesArray } from '@type/roadmap/nodes';
import { isValidNodeType } from '@type/roadmap/typecheckers';

// handles all the node type change logic for every node
const DropdownType = ({ id, title }: { id: string; title: string }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (isValidNodeType(value)) {
      setSelectedOption(value);
      changeNodeType(id, value, title);
    }
  };

  return (
    <select
      className='absolute w-20'
      value={selectedOption}
      onChange={handleChange}
    >
      {NodeIdentifierTypesArray.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownType;
