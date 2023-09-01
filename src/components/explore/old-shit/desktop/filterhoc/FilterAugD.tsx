import React, { useEffect } from 'react';
import {
  opitonsFilter1,
  opitonsFilter2,
  opitonsFilter3,
} from '@components/explore/old-shit/mobile/FilterManager';
import AugmentFilterD from './augmentFilterD';
import Filter1d from './individualfilters/Filter1d';
import Filter2d from './individualfilters/Filter2d';
import Filter3d from './individualfilters/Filter3d';

const FilterAugD = (props) => {
  const { onChange, onSave, value, filterChoose, setFilterChoose } = props;

  useEffect(() => {
    if (
      value.SomeField1 !== 'none' ||
      value.SomeField2 !== 'none' ||
      value.SomeField3 !== 'none'
    ) {
      setFilterChoose(true);
    }
  }, [value]);

  return (
    <div>
      <div className='flex justify-center items-center select-none '>
        <div className='grid grid-cols-3 mt-10 w-[830px] gap-16 2xl:w-[1100px]'>
          <div>
            <Filter1d
              onChange={(NameField) => onChange('SomeField1', NameField)}
              options={opitonsFilter1}
              value={value.SomeField1}
            />
          </div>
          <div>
            <Filter2d
              onChange={(NameField) => onChange('SomeField2', NameField)}
              options={opitonsFilter2}
              value={value.SomeField2}
            />
          </div>
          <div>
            <Filter3d
              onChange={(NameField) => onChange('SomeField3', NameField)}
              options={opitonsFilter3}
              value={value.SomeField3}
            />
          </div>
        </div>
      </div>
      <div>
        {' '}
        {filterChoose && (
          <div className='flex justify-center items-center mt-10'>
            <button
              type='button'
              className='bg-secondary w-32 h-9 rounded-lg text-white font-roboto-text 2xl:w-40 2xl:h-10 2xl:text-lg'
              onClick={() => {
                onSave();
                setFilterChoose(false);
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AugmentFilterD(FilterAugD);
