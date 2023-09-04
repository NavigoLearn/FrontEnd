import React from 'react';
import HOCedit from '@components/profile/old-stuff/common/HOCedit';
import { ProfileComponentProps } from '@type/profile/types';

const Quote = ({ onEdit, edit, value }: ProfileComponentProps) => {
  return (
    <div className='flex-col justify-center items-center w-fit mt-4'>
      <div className='text-[14px] text-center text-placeholder font-roboto-text'>
        Quote
      </div>
      {!edit ? (
        <div className='italic text-[20px] font-normal text-center text-secondary font-roboto-text'>
          &quot;{value}&quot;
        </div>
      ) : (
        <input
          value={value}
          onChange={(e) => {
            onEdit(e.target.value);
          }}
          className='italic min-w-[20px] border-2 border-gray-300 text-[20px] font-normal text-center text-secondary font-roboto-text'
        />
      )}
    </div>
  );
};

export default HOCedit(Quote);
