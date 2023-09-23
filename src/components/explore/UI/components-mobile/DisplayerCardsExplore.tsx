import React from 'react';
import { type ICardRoadmapTypeApi } from '@src/types/explore/card';
import { type ISearchParams } from '../../stores/explore-query-store';
import Card from '../shared/cards/Card';
import LoadingCard from '../shared/cards/LoadingCard';

type Props = {
  cardData: {
    total: number;
    loading: boolean;
    cards: ICardRoadmapTypeApi[];
  };
  params: ISearchParams;
};

const DisplayerCardsExplore = ({ cardData, params }: Props) => {
  return (
    <div className='my-4'>
      <div className='w-full gap-y-4 flex flex-col items-center'>
        {/* eslint-disable-next-line no-nested-ternary */}
        {cardData && !cardData.loading ? (
          cardData.cards.length === 0 ? (
            <div className='text-base font-kanit-text text-darkBlue font-semibold mt-10'>
              No results found
            </div>
          ) : (
            cardData.cards.map((card: ICardRoadmapTypeApi) => {
              // eslint-disable-next-line react/no-array-index-key
              return (
                <Card
                  data={card}
                  key={card.id}
                  w='100%'
                  h='12rem'
                  className='max-w-sm'
                />
              );
            })
          )
        ) : (
          new Array(params.perPage).fill(0).map((_, i) => {
            // eslint-disable-next-line react/no-array-index-key
            return <LoadingCard key={i} />;
          })
        )}
      </div>
    </div>
  );
};

export default DisplayerCardsExplore;
