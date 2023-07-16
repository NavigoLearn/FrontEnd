import React from 'react';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
};

const PropertyEditorNumber = ({ name, value, onChange }: IDisplayProperty) => {
  return (
    <div className='flex gap-5'>
      <div>{name}</div>
      <div>
        <input
          type='range'
          min={-100}
          max={100}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PropertyEditorNumber;
