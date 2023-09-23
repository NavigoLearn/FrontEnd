import React, { useEffect } from 'react';
import { useExploreCardData } from '../logic/hooks/useExploreCardData';
import HeaderExplore from './components-mobile/HeaderExplore';
import DisplayerCardsExplore from './components-mobile/DisplayerCardsExplore';
import Pagination from './components-desktop/paginations/Pagination';

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
      <div className='w-full mt-10 mb-10 flex justify-center'>
        <Pagination
          currentPage={params.page}
          roadmapsPerPage={params.perPage}
          totalRoadmaps={cardData.total}
          isMobile
        />
      </div>
    </div>
  );
};

export default ExploreMobile;
