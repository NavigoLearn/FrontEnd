import React from 'react';
import OptionSelect from '@components/explore/UI/components-desktop/filters/OptionSelect';
import {
  IPerPage,
  ISortBy,
  ITopic,
  setExploreQueryPerPage,
  setExploreQuerySortBy,
  setExploreQueryTopic,
  sortByOptions,
  perPageOptions,
  topicOptions,
} from '@components/explore/stores/explore-query-store';
import Card from '@components/explore/UI/shared/cards/Card';
import Pagination from '@components/explore/UI/components-desktop/paginations/Pagination';
import { CardRoadmapTypeApi } from '@type/explore/card';
import LoadingCard from '@components/explore/UI/shared/cards/LoadingCard';
import { useExploreCardData } from '@components/explore/logic/hooks/useExploreCardData';

const ExploreDesktop = () => {
  const { cardData, params, perPage, sortBy, topic } = useExploreCardData();

  console.log('cardData', cardData);
  return (
    <div className='w-full flex justify-center'>
      <div className='w-[1500px]'>
        <div className='w-full flex justify-between gap-16'>
          <div className='w-52'>
            <div className='w-full h-24' />
            <div className='w-full h-96 pl-3 flex flex-col gap-3  '>
              <OptionSelect
                name='Sort By'
                options={sortByOptions}
                callback={(newSortBy: ISortBy) => {
                  setExploreQuerySortBy(newSortBy);
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
          <div className='w-[1200px]'>
            <div className='w-full h-24   flex justify-between items-end  '>
              <div className='text-3xl font-kanit-text  text-darkBlue font-semibold mb-6'>
                {cardData.total} results{' '}
                {params.query != '' && `for '${params.query}'`}
              </div>
              <button
                type='button'
                className='py-1 px-3 border-2 border-primary font-roboto-text font-medium text-primary rounded-lg mb-6 hover:bg-primary hover:text-white transition-all'
              >
                I'm feeling lucky
              </button>
            </div>

            <div className='max-w-[1100px] grid landing-min:grid-cols-3 grid-cols-2 gap-x-7 gap-y-6 '>
              {!!cardData && !cardData.loading ? (
                cardData.cards.length === 0 ? (
                  <div className='text-2xl font-kanit-text text-darkBlue font-semibold mt-10'>
                    No results found
                  </div>
                ) : (
                  cardData.cards.map((card: CardRoadmapTypeApi, i) => {
                    return <Card data={card} key={i} />;
                  })
                )
              ) : (
                new Array(params.perPage).fill(0).map((_, i) => {
                  return <LoadingCard key={i} />;
                })
              )}
            </div>
            <div className='w-full mt-10 mb-20 flex justify-center'>
              <Pagination
                currentPage={params.page}
                roadmapsPerPage={params.perPage}
                totalRoadmaps={cardData.total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDesktop;
