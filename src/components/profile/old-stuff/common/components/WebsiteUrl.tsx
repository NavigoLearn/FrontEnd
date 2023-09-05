import React from 'react';
import link from '@assets/link.svg';
import { ProfileComponentProps } from '@type/profile/types';
import HOCedit from '@components/profile/old-stuff/common/HOCedit';

const WebsiteUrl = ({ edit, onEdit, value }: ProfileComponentProps) => {
  return (
    <div className='flex justify-center text-center items-center mt-4 w-fit'>
      {!edit ? (
        <a
          href={value === '' ? '#' : value}
          className='inline-block text-lg font-normal text-center text-primary font-roboto-text'
          aria-label='Link to external website'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            draggable='false'
            src={link}
            className='mx-2 inline-block w-4 h-4 select-none'
            alt='linkicon'
          />
          {value.replaceAll('https://', '').replaceAll('http://', '')}
        </a>
      ) : (
        <div className='flex'>
          <img
            draggable='false'
            src={link}
            className='mx-2 inline-block w-4 h-4 select-none'
            alt='linkicon'
          />
          <input
            type='url'
            className='inline-block min-w-[20px] border-2 border-gray-300 text-lg font-normal text-center text-primary font-roboto-text select-none'
            value={value}
            onChange={(e) => {
              onEdit(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HOCedit(WebsiteUrl);
