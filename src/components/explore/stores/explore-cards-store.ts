import { atom } from 'nanostores';
import { CardRoadmapTypeApi } from '@type/explore/card';
import { fetchRoadmapCardsExplore } from '@src/api-wrapper/explore/roadmap-card-data';
import { exploreQueryStore } from '@components/explore/stores/explore-query-store';

export const exploreCardsStore = atom({
  cards: [] as CardRoadmapTypeApi[],
  total: 0,
  loading: true,
});

export function setCardsLoading() {
  exploreCardsStore.set({
    ...exploreCardsStore.get(),
    loading: true,
  });
}

export function setCardsLoaded() {
  exploreCardsStore.set({
    ...exploreCardsStore.get(),
    loading: false,
  });
}

export async function fetchAndSetRoadmapCardsExplore() {
  console.log('fetching cards');
  setCardsLoading();

  // fetch cards from api using query
  const data = await fetchRoadmapCardsExplore(exploreQueryStore.get().params);

  exploreCardsStore.set({
    ...exploreCardsStore.get(),
    cards: data.data,
    total: data.total,
  });

  // update the store
  setCardsLoaded();
}
