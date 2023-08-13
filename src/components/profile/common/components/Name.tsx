import React from 'react';
import HOCedit from '@components/profile/common/HOCedit';
import { ProfileComponentProps } from '@type/profile/types';
import { capStringLen } from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';

const Name = ({ value, edit, onEdit }: ProfileComponentProps) => {
  return (
    <div className='flex justify-center items-center text-center w-fit mt-4'>
      {!edit ? (
        <div className='text-2xl font-semibold font-roboto-text'>{value}</div>
      ) : (
        <input
          value={value}
          onChange={(e) => {
            onEdit(capStringLen(e.target.value, 14));
          }}
          className='text-2xl border-2 border-gray-300 min-w-[20px] font-semibold font-roboto-text'
        />
      )}
    </div>
  );
};

export default HOCedit(Name);
