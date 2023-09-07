import { useStore } from '@nanostores/react';
import { exploreQueryStore } from '@components/explore/stores/explore-query-store';
import {
  exploreCardsStore,
  fetchAndSetRoadmapCardsExplore,
} from '@components/explore/stores/explore-cards-store';
import { useEffect } from 'react';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export function useExploreCardData() {
  const { params } = useStore(exploreQueryStore);
  const cardData = useStore(exploreCardsStore);
  const { perPage, sortBy, topic } = params;

  useEffect(() => {
    fetchAndSetRoadmapCardsExplore();
  }, [params]);

  return { cardData, params, perPage, sortBy, topic };
}
