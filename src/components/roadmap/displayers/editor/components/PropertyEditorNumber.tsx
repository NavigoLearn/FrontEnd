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
          className='text-darkBlue w-16 font-semibold'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PropertyEditorNumber;
