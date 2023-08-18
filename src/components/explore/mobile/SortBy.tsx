import React, { useEffect, useRef, useState } from 'react';
import dropclose from '@assets/cross.svg';

const sorts = [
  { sort: 'Likes', id: 1 },
  { sort: 'Trending', id: 2 },
  { sort: 'Views', id: 3 },
  { sort: 'Comments', id: 4 },
];

type ClickSort = {
  handleClick: (stateVar: 'sort' | 'filter') => void;
};

const SortBy = ({ handleClick }: ClickSort) => {
  const [filterSelected, setFilterSelected] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    const calculateScroll = () => {
      const scrollPosition = window.scrollY;
      ref.current.style.top = `${scrollPosition}px`; // Convert to pixels
      ref.current.style.display = 'block';
    };

    calculateScroll();

    window.addEventListener('scroll', calculateScroll);
    return () => {
      window.removeEventListener('scroll', calculateScroll);
      body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div ref={ref} className='h-screen w-screen bg-background absolute z-10'>
      <div className='text-[18px] flex justify-center space-x-24 items-center mt-6 sm:space-x-72 sm:text-[28px]'>
        <h1 className='inline-block'>Sort roadmaps by</h1>
        <button type='button' onClick={() => handleClick('sort')}>
          <img draggable="false"
            src={dropclose}
            alt='closeButton'
            className='h-7 w-7 sm:h-9 sm:w-9 inline-block'
          />
        </button>
      </div>
      <div className='flex items-center justify-center mt-8'>
        <ul className='content-start mr-[150px] sm:mr-[300px]'>
          {sorts.map((sort) => (
            <div key={sort.id} className='mt-5'>
              <input
                type='radio'
                name='sortElement'
                id={sort.sort}
                className='mr-2 sm:h-4 sm:w-4'
                onClick={() => setFilterSelected(sort.sort)}
              />
              <label
                htmlFor={sort.sort}
                className='sm:text-[23px] sm:font-roboto-text'
              >
                {sort.sort}
              </label>
            </div>
          ))}
        </ul>
      </div>
      <div className='flex justify-center items-center absolute bottom-10 w-full '>
        <button
          type='button'
          className='bg-secondary w-28 h-8 rounded-lg text-white font-roboto-text'
          onClick={() => {
            handleClick('sort');
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SortBy;
