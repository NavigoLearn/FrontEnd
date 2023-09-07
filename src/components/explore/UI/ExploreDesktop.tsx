import React, { useEffect } from 'react';
import OptionSelect
  from '@components/explore/UI/components-desktop/filters/OptionSelect';
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
import Pagination
  from '@components/explore/UI/components-desktop/paginations/Pagination';
import {
  exploreCardsStore, refreshExploreCards,
} from '@components/explore/stores/explore-cards-store';
import { CardRoadmapTypeApi } from '@type/explore/card';
import LoadingCard from '@components/explore/UI/shared/cards/LoadingCard';

const ExploreDesktop = () => {
  const { params } = useStore(exploreQueryStore);
  const cardData = useStore(exploreCardsStore);
  const { perPage, sortBy, topic } = params;
  const sortByOptions: ISortBy[] = [ 'Likes', 'Views', 'New' ];
  const perPageOptions: IPerPage[] = [ 15, 30, 50 ];
  const topicOptions: ITopic[] = [
    'All',
    'Programming',
    'Math',
    'Physics',
    'Biology',
  ];

  useEffect(() => {
    refreshExploreCards().catch((e) => {
      console.log(e);
    });
  }, []);

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
              <div
                className='text-3xl font-kanit-text  text-darkBlue font-semibold mb-6'>
                {cardData.total} results {params.query != '' && `for '${params.query}'`}
              </div>
              <button
                type='button'
                className='py-1 px-3 border-2 border-primary font-roboto-text font-medium text-primary rounded-lg mb-6 hover:bg-primary hover:text-white transition-all'
              >
                I'm feeling lucky
              </button>
            </div>
            <div
              className='max-w-[1100px] grid landing-min:grid-cols-3 grid-cols-2 gap-x-7 gap-y-6 '>
              {!!cardData &&
              !cardData.loading ? (
                  cardData.cards.length === 0 ? (
                      <div
                        className='text-2xl font-kanit-text text-darkBlue font-semibold mt-10'>
                        No results found
                      </div>
                    ) :
                    cardData.cards.map((card: CardRoadmapTypeApi, i) => {
                      return <Card data={card} key={i}/>;
                    })) :
                new Array(params.perPage).fill(0).map((_, i) => {
                  return <LoadingCard key={i}/>;
                })}
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
