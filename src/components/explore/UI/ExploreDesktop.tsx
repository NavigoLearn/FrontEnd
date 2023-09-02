import React from 'react';
import OptionSelect from '@components/explore/UI/components-desktop/OptionSelect';
import {
  exploreQueryStore,
  IPerPage,
  ISortBy,
  ITopic,
  setExploreQueryPerPage,
  setExploreQuerySortBy,
  setExploreQueryTopic,
} from '@components/explore/stores/explore-query-store';
import { useStore } from '@nanostores/react';

const ExploreDesktop = () => {
  const { params } = useStore(exploreQueryStore);
  const { page, perPage, query, sortBy, topic } = params;
  const sortByOptions: ISortBy[] = ['Likes', 'Views', 'Relevance'];
  const perPageOptions: IPerPage[] = [15, 30, 50];
  const topicOptions: ITopic[] = [
    'All',
    'Programming',
    'Math',
    'Physics',
    'Biology',
  ];

  return (
    <div className='w-full h-full border-black border-2'>
      <div className=' w-full border-2 border-black flex'>
        <div className='w-52 border-2 border-black'>
          <div className='w-full h-24'>empty space</div>
          <div className='w-full h-96 border-2 border-black pl-3 flex flex-col gap-3  '>
            <OptionSelect
              name='Sort By'
              options={sortByOptions}
              callback={(name: ISortBy) => {
                setExploreQuerySortBy(name);
              }}
              selected={sortBy}
            />
            <OptionSelect
              name='Roadmaps per page'
              options={perPageOptions}
              callback={(name: IPerPage) => {
                setExploreQueryPerPage(name);
              }}
              selected={perPage}
            />
            <OptionSelect
              name='Topic'
              options={topicOptions}
              callback={(name: ITopic) => {
                setExploreQueryTopic(name);
              }}
              selected={topic}
            />
          </div>
        </div>
        <div className='flex-grow  border-2 border-black'>
          <div className='w-full h-24 border-2 border-black  flex justify-between items-end  '>
            <div className='text-3xl font-kanit-text  text-darkBlue font-semibold'>
              10,000 results for "React"
            </div>
            <button
              type='button'
              className='py-2 px-4 border-2 border-primary font-roboto-text font-medium text-primary rounded-lg text-lg'
            >
              I'm feeling lucky
            </button>
          </div>
          <div className='w-full h-96 border-2 border-black'>Cards go here</div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDesktop;
