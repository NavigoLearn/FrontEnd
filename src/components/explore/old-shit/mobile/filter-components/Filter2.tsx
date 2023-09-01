import React from 'react';
import chevronup from '@assets/chevron-up.svg';
import chevrondown from '@assets/chevron-down.svg';

const Filter2 = (props) => {
  const { onChange, options, value, isOpen, setIsOpen } = props;

  return (
    <div className='flex justify-center mt-14 space-x-1 items-center'>
      <span className='text-[18px] font-roboto-text sm:text-[23px]'>
        SomeField2
      </span>
      <div className='relative'>
        <button
          onClick={() =>
            setIsOpen(isOpen === 'SomeField2' ? false : 'SomeField2')
          }
          type='button'
          className='bg-white rounded-lg shadow-standard w-40 text-[15x] h-7 sm:w-44 sm:h-8'
        >
          <div className='relative rounded-md'>
            <span className='font-roboto sm:text-[18px]'>{value}</span>
            {isOpen === 'SomeField2' ? (
              <img draggable="false"
                src={chevronup}
                alt='openList'
                className='h-6 w-6 sm:h-7 sm:w-7 sm:top-0 top-[0px] absolute right-1'
              />
            ) : (
              <img draggable="false"
                src={chevrondown}
                alt='closeList'
                className='h-6 w-6 sm:h-7 sm:w-7 sm:top-0 top-[0px] absolute right-1'
              />
            )}
          </div>
        </button>
        {isOpen === 'SomeField2' && (
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
                className='w-40 h-6 sm:w-44 sm:h-7 text-[14px]'
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

export default Filter2;
