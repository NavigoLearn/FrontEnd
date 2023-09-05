import React from 'react';

const Label = ({ label }: { label: string }) => {
  return (
    <div>
      <div className='text-lg font-light text-center mt-2 font-roboto-text text-secondary'>
        {label}
      </div>
    </div>
  );
};

export default Label;
