import React, { useState } from 'react';
import chevronup from '@assets/chevron-up.svg';
import chevrondown from '@assets/chevron-down.svg';

const Filter1d = (props) => {
  const { onChange, options, value} = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    // normal este space-x-7 dar la fold trbuie space-x-1
    <div className='flex justify-center items-center flex-col gap-3'>
      <span className='text-[18px] font-roboto-text sm:text-[23px]'>
        SomeField1
      </span>
      <div className='relative'>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type='button'
          className='bg-white rounded-lg shadow-standard w-40 text-[15x] h-7 sm:w-56 sm:h-10'
        >
          <div className='relative rounded-md'>
            <span className='font-roboto sm:text-[20px] font-light'>
              {value}
            </span>
            {isOpen ? (
              <img
                src={chevronup}
                alt='openList'
                className='h-6 w-6 sm:h-7 sm:w-7 sm:top-0 top-[0px] absolute right-1'
              />
            ) : (
              <img
                src={chevrondown}
                alt='closeList'
                className='h-6 w-6 sm:h-7 sm:w-7 sm:top-0 top-[0px] absolute right-1'
              />
            )}
          </div>
        </button>
        {isOpen && (
          <ul className='flex justify-center items-center flex-col mt-1 absolute bg-white rounded-md font-roboto z-10'>
            {options.map((option) => (
              <button
                type='button'
                key={option.id}
                onClick={() => {
                  // aici intra onchange click pe un buton
                  onChange(option.name);
                  setIsOpen(false);
                }}
                className='w-40 h-6 sm:w-56 sm:h-10 text-[18px] font-light'
              >
                {option.name}
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter1d;
