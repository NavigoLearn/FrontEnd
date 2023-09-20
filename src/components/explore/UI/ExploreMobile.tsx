import React, { useEffect } from 'react';
import { useExploreCardData } from '../logic/hooks/useExploreCardData';
import HeaderExplore from './components-mobile/HeaderExplore';
import DisplayerCardsExplore from './components-mobile/DisplayerCardsExplore';

const ExploreMobile = () => {
  useExploreCardData();
  const { cardData, params, perPage, sortBy, topic } = useExploreCardData();

  return (
    <div className='mx-6'>
      <HeaderExplore
        results={cardData.total}
        query={params.query}
        perPage={perPage}
        sortBy={sortBy}
        topic={topic}
      />
      <DisplayerCardsExplore cardData={cardData} params={params} />
    </div>
  );
};

export default ExploreMobile;
