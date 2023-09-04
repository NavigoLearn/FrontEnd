import React from 'react';
import { ProfileComponentProps } from '@type/profile/types';
import HOCedit from '@components/profile/old-stuff/common/HOCedit';

const Bio = ({ onEdit, value, edit }: ProfileComponentProps) => {
  return (
    <div className='flex w-full md:w-60 flex-col justify-start text-start text-[20px] text-main font-normal font-roboto-text mt-4'>
      BIO
      {!edit ? (
        <div className='text-md flex font-normal text-start text-[16px] mt-4 text-secondary font-roboto-text'>
          {value}
        </div>
      ) : (
        <textarea
          className='text-md flex font-normal text-start border-2 border-gray-300 min-w-[150px] md:min-w-[250px] text-[16px] mt-4 text-secondary font-roboto-text'
          value={value}
          onChange={(e) => {
            onEdit(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default HOCedit(Bio);
