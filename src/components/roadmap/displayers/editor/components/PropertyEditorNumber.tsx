import React from 'react';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
};

const PropertyEditorNumber = ({ name, value, onChange }: IDisplayProperty) => {
  return (
    <div className='flex gap-3 items-center'>
      <div className='text-secondary'>{name}</div>
      <div>
        <input
          type='text'
          className='text-darkBlue outline-gray-500 p-1 pl-2 w-16'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PropertyEditorNumber;
