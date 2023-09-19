import React, { useState } from 'react';
import { NAVBAR_SEARCH_RESULT_MAX_LENGTH } from '@src/typescript/roadmap_ref/node/components/text/text-params';
import MobilePopUp from './MobilePopUp';

type Props = {
  results: number;
  query: string;
};

const HeaderExplore = ({ results, query }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const testQuery = 'JavaShit';

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='font-kanit-text w-40 break-words'>
        <div className='text-placeholderBlack text-xs'>
          {' '}
          {results} results {testQuery !== '' && 'for'}
        </div>
        <div className='text-sm text-secondary'>
          {testQuery !== '' && (
            <span>
              &apos;
              {testQuery.length > NAVBAR_SEARCH_RESULT_MAX_LENGTH
                ? `${testQuery.slice(0, NAVBAR_SEARCH_RESULT_MAX_LENGTH)}...`
                : testQuery}
              &apos;
            </span>
          )}
        </div>
      </div>
      <button
        type='button'
        className='w-24 h-7 bg-[#2557D6] font-roboto-text drop-shadow-md text-sm text-white rounded-sm mt-2'
        onClick={() => toggleFilter()}
      >
        Filters
      </button>
      {openFilter && <MobilePopUp toggleFilter={toggleFilter} />}
    </div>
  );
};

export default HeaderExplore;
