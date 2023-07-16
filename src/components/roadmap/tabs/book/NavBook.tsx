import React from 'react';
import dropclose from '@assets/cross.svg';
import Button from '@components/roadmap/tabs/utils/Button';

type NavBookProps = {
  setSelect: (value: string) => void;
};

const NavBook = ({ setSelect }: NavBookProps) => {
  return (
    <div className='w-full h-14 flex-shrink-0 border-b-2 border-gray-300 relative flex items-center justify-center '>
      <button
        type='button'
        onClick={() => {
          // flipOpen();
        }}
        className='absolute h-6 w-6 left-2 flex justify-center items-center'
      >
        <img
          alt=''
          draggable='false'
          src={dropclose}
          className='h-full w-full'
        />
      </button>
      <div className='absolute left-14 h-full flex justify-center items-center'>
        <Button
          text='Go to chapters'
          callback={() => {
            setSelect('chapters');
          }}
          color='primary'
          size='small'
        />
      </div>
      <div className='hidden sm:block font-bold text-lg font-roboto-text '>
        Roadmap Guide Book
      </div>
      <div className='absolute right-2 top-2 text-sm text-placeholder '>
        By Erupturatis
      </div>
    </div>
  );
};

export default NavBook;
