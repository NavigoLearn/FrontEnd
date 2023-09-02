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
import Card from '@components/explore/UI/shared/Card';

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

  const roadmapsIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className='w-full mt-4'>
      <div className=' w-full flex justify-center'>
        <div className='w-52 '>
          <div className='w-full h-24' />
          <div className='w-full h-96  pl-3 flex flex-col gap-3  '>
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
        <div className='w-[1600px]'>
          <div className='w-full h-24   flex justify-between items-end  '>
            <div className='text-3xl font-kanit-text  text-darkBlue font-semibold mb-6'>
              10,000 results for "React"
            </div>
            <button
              type='button'
              className='py-2 px-4 border-2 border-primary font-roboto-text font-medium text-primary rounded-lg text-lg mb-6'
            >
              I'm feeling lucky
            </button>
          </div>
          <div className='w-[1600px] grid grid-cols-3 gap-x-4 gap-y-4 '>
            {roadmapsIds.map((roadmapId) => {
              return <Card roadmapId={roadmapId} key={roadmapId} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDesktop;
