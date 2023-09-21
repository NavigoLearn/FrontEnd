import React, { useState } from 'react';
import exit from '@assets/editor/close.svg';
import useScreenLock from './useScreenLock';
import OptionSelectMobile from '../components-desktop/filters/OptionSelectMobile';
import {
  perPageOptions,
  topicOptions,
  sortByOptions,
  type IPerPage,
  type ISortBy,
  type ITopicParam,
  setExploreQueryPerPage,
  setExploreQueryTopic,
  setExploreQuerySortBy,
} from '../../stores/explore-query-store';

type Props = {
  toggleFilter: () => void;
  perPage: IPerPage;
  sortBy: ISortBy;
  topic: ITopicParam;
};

const MobilePopUp = ({ toggleFilter, perPage, sortBy, topic }: Props) => {
  useScreenLock();
  const [roadmapsPerPage, setRoadMpapsPerPage] = useState<IPerPage>(perPage);
  const [sortByState, setSortByState] = useState<ISortBy>(sortBy);
  const [topicState, setTopicState] = useState<ITopicParam>(topic);

  const handleSendQuery = () => {
    if (roadmapsPerPage) {
      setExploreQueryPerPage(roadmapsPerPage);
    }
    if (sortByState) {
      setExploreQuerySortBy(sortByState);
    }
    if (topicState) {
      setExploreQueryTopic(topicState);
    }
    toggleFilter();
  };

  return (
    <div className='bg-[#1A1B504D] top-0 left-0 z-50 flex justify-center items-center w-screen h-screen fixed'>
      <div className='h-80 mx-6 bg-white w-full mb-32 rounded-md relative'>
        <button
          type='button'
          className='w-5 h-5 absolute top-5 right-3'
          onClick={() => toggleFilter()}
        >
          <img src={exit.src} alt='exitButton' />
        </button>
        <div className='p-4'>
          <div>
            <OptionSelectMobile
              name='Roadmaps per page'
              options={perPageOptions}
              callback={(name: IPerPage) => {
                setRoadMpapsPerPage(name);
              }}
              selected={roadmapsPerPage}
            />
          </div>
          <div className='mt-6'>
            <OptionSelectMobile
              name='Sort By'
              options={sortByOptions}
              callback={(newSortBy: ISortBy) => {
                setSortByState(newSortBy);
              }}
              selected={sortByState}
            />
          </div>
          <div className='mt-6'>
            <OptionSelectMobile
              name='Topic'
              options={topicOptions}
              callback={(name: ITopicParam) => {
                setTopicState(name);
              }}
              selected={topicState}
            />
          </div>
        </div>
        <button
          type='button'
          className='w-full h-12 text-primary font-medium font-roboto-text flex justify-center items-center text-sm absolute bottom-0'
          onClick={() => handleSendQuery()}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MobilePopUp;
