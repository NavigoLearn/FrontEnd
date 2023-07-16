import React from 'react';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
};

const PropertyEditorDropdown = ({
  name,
  value,
  onChange,
}: IDisplayProperty) => {
  return (
    <div className='flex gap-5'>
      <div>{name}</div>
      <div>needs to be done after design</div>
    </div>
  );
};

export default PropertyEditorDropdown;
