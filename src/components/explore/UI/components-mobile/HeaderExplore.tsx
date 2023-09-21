import React, { useState } from 'react';
import { NAVBAR_SEARCH_RESULT_MAX_LENGTH } from '@src/typescript/roadmap_ref/node/components/text/text-params';
import MobilePopUp from './MobilePopUp';
import {
  type IPerPage,
  type ITopicParam,
  type ISortBy,
} from '../../stores/explore-query-store';

type Props = {
  results: number;
  query: string;
  perPage: IPerPage;
  sortBy: ISortBy;
  topic: ITopicParam;
};

const HeaderExplore = ({ results, query, perPage, sortBy, topic }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='font-kanit-text w-40 break-words'>
        <div className='text-placeholderBlack text-xs'>
          {' '}
          {results} results {query !== '' && 'for'}
        </div>
        <div className='text-sm text-secondary'>
          {query !== '' && (
            <span>
              &apos;
              {query.length > NAVBAR_SEARCH_RESULT_MAX_LENGTH
                ? `${query.slice(0, NAVBAR_SEARCH_RESULT_MAX_LENGTH)}...`
                : query}
              &apos;
            </span>
          )}
        </div>
      </div>
      <button
        type='button'
        className='w-24 h-7 bg-[#2557D6] font-roboto-text drop-shadow-md text-sm text-white rounded-sm mt-2 focus:outline-none'
        onClick={() => toggleFilter()}
      >
        Filters
      </button>
      {openFilter && (
        <MobilePopUp
          toggleFilter={toggleFilter}
          perPage={perPage}
          sortBy={sortBy}
          topic={topic}
        />
      )}
    </div>
  );
};

export default HeaderExplore;
