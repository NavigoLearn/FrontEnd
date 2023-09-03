import React from 'react';
import OptionSelect from '@components/explore/UI/components-desktop/filters/OptionSelect';
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
import Card from '@components/explore/UI/shared/cards/Card';
import Pagination from '@components/explore/UI/components-desktop/paginations/Pagination';

const ExploreDesktop = () => {
  const { params } = useStore(exploreQueryStore);
  const { page, perPage, query, sortBy, topic } = params;
  const sortByOptions: ISortBy[] = ['Likes', 'Views', 'Relevance'];
  const perPageOptions: IPerPage[] = [9, 18, 36];
  const topicOptions: ITopic[] = [
    'All',
    'Programming',
    'Math',
    'Physics',
    'Biology',
  ];

  const roadmapsIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className='w-full flex justify-center'>
      <div className='max-w-[1500px]'>
        <div className='w-full flex justify-between gap-16'>
          <div className='w-52'>
            <div className='w-full h-24' />
            <div className='w-full h-96 pl-3 flex flex-col gap-3  '>
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
          <div className='max-w-[1200px]'>
            <div className='w-full h-24   flex justify-between items-end  '>
              <div className='text-xl font-kanit-text  text-darkBlue font-semibold mb-6'>
                10,000 results for "React"
              </div>
              <button
                type='button'
                className='py-1 px-3 border-2 border-primary font-roboto-text font-medium text-primary rounded-lg mb-6'
              >
                I'm feeling lucky
              </button>
            </div>
            <div className='max-w-[1100px] grid landing-min:grid-cols-3 grid-cols-2 gap-x-7 gap-y-6 '>
              {roadmapsIds.map((roadmapId) => {
                return <Card roadmapId={roadmapId} key={roadmapId} />;
              })}
            </div>
          </div>
        </div>
        <div className='w-full mt-10 mb-20 flex justify-center'>
          <Pagination currentPage={1} roadmapsPerPage={9} totalRoadmaps={400} />
        </div>
      </div>
    </div>
  );
};

export default ExploreDesktop;
