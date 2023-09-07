import { atom } from 'nanostores';
import {
  refreshExploreCards, setCardsLoading,
} from '@components/explore/stores/explore-cards-store';

export type ISortBy = 'Likes' | 'Views' | 'New';
export type IPerPage = 15 | 30 | 50;
export type ITopic = 'All' | 'Programming' | 'Math' | 'Physics' | 'Biology';

export type ISearchParams = {
  query: string;
  page: number;
  sortBy: ISortBy;
  perPage: IPerPage;
  topic: ITopic;
};
export const exploreQueryStore = atom({
  params: {
    query: '',
    page: 1,
    sortBy: 'Likes' as ISortBy,
    perPage: 30 as IPerPage,
    topic: 'All' as ITopic,
  },
} as {
  params: ISearchParams;
});

let tempQuery;
export function setExploreQuery({ query }: Partial<ISearchParams>) {
  setCardsLoading();

  tempQuery = query;
  // wait for 250ms before checking if the query has changed
  setTimeout(() => {
    if (tempQuery === query) {
      exploreQueryStore.set({
        params: {
          ...exploreQueryStore.get().params,
          query,
        },
      });

      refreshExploreCards().catch((err) => {console.log(err)});
    }
  }, 250);
}

export function setExploreQueryPage(page: number) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      page,
    },
  });
  refreshExploreCards().catch((err) => {console.log(err)});
}

export function setExploreQuerySortBy(sortBy: ISortBy) {
  const newStore = exploreQueryStore.get();
  newStore.params.sortBy = sortBy;
  exploreQueryStore.set({ params: {
      ...exploreQueryStore.get().params,
        sortBy,
    },
  });

  refreshExploreCards().catch((err) => {console.log(err)});
}

export function setExploreQueryPerPage(perPage: IPerPage) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      perPage,
    },
  });

  refreshExploreCards().catch((err) => {console.log(err)});
}

export function setExploreQueryTopic(topic: ITopic) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      topic,
    },
  });

  refreshExploreCards().catch((err) => {console.log(err)});
}
