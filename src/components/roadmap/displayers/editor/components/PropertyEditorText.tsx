import React from 'react';

type IDisplayProperty = {
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const PropertyEditorText = ({ name, value, onChange }: IDisplayProperty) => {
  return (
    <div className='flex gap-5'>
      <div>{name}</div>
      <div>
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
};

export default PropertyEditorText;
