import React, { useEffect, useRef } from 'react';
import dropclose from '@assets/cross.svg';
import Filter1 from '@components/explore/old-shit/mobile/filter-components/Filter1';
import Filter2 from '@components/explore/old-shit/mobile/filter-components/Filter2';
import Filter3 from '@components/explore/old-shit/mobile/filter-components/Filter3';
import AugmentFilter from '@components/explore/old-shit/mobile/filter-hoc/AugmentFilter';
import { FilterManagerProps } from '@type/explore/filterProps';

export const opitonsFilter1 = [
  { name: 'a', id: 1 },
  { name: 'b', id: 2 },
  { name: 'c', id: 3 },
  { name: 'd', id: 4 },
];

export const opitonsFilter2 = [
  { name: 'e', id: 1 },
  { name: 'f', id: 2 },
  { name: 'g', id: 3 },
  { name: 'h', id: 4 },
];

export const opitonsFilter3 = [
  { name: 'i', id: 1 },
  { name: 'j', id: 2 },
  { name: 'k', id: 3 },
  { name: 'l', id: 4 },
];

const FilterManager = ({
  onChange,
  value,
  handleClick,
  onSave,
  isOpen,
  setIsOpen,
}: FilterManagerProps) => {
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
        <h1 className='inline-block'>Filter roadmaps by</h1>
        <button type='button' onClick={() => handleClick('filter')}>
          <img
            draggable='false'
            src={dropclose}
            alt='closeButton'
            className='h-7 w-7 sm:h-9 sm:w-9 inline-block'
          />
        </button>
      </div>
      <div className='mt-20 flex justify-center flex-col'>
        <div className='flex flex-col sm:mr-44'>
          <Filter1
            onChange={(nameField) => {
              onChange('SomeField1', nameField);
            }}
            options={opitonsFilter1}
            value={value.SomeField1}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Filter2
            onChange={(nameField) => {
              onChange('SomeField2', nameField);
            }}
            options={opitonsFilter2}
            value={value.SomeField2}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Filter3
            onChange={(nameField) => {
              onChange('SomeField3', nameField);
            }}
            options={opitonsFilter3}
            value={value.SomeField3}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        <div className='flex justify-center items-center absolute bottom-10 w-full '>
          <button
            type='button'
            className='bg-secondary w-28 h-8 rounded-lg text-white font-roboto-text'
            onClick={() => {
              onSave();
              handleClick('filter');
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AugmentFilter(FilterManager);
