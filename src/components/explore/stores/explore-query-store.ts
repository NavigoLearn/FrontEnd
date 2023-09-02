import { atom } from 'nanostores';

export type ISortBy = 'Relevance' | 'Likes' | 'Views';
export type IPerPage = 15 | 30 | 50;
export type ITopic = 'All' | 'Programming' | 'Math' | 'Physics' | 'Biology';

type IParams = {
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
    perPage: 15 as IPerPage,
    topic: 'All' as ITopic,
  },
} as {
  params: IParams;
});

export function setExploreQuery(query: Partial<IParams>) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      ...query,
    },
  });
}

export function setExploreQueryPage(page: number) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      page,
    },
  });
}

export function setExploreQuerySortBy(sortBy: ISortBy) {
  const newStore = exploreQueryStore.get();
  newStore.params.sortBy = sortBy;
  exploreQueryStore.set({ ...newStore });
}

export function setExploreQueryPerPage(perPage: IPerPage) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      perPage,
    },
  });
}

export function setExploreQueryTopic(topic: ITopic) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      topic,
    },
  });
}
