import { atom } from 'nanostores';

export type ISortBy = 'Likes' | 'Views' | 'New';
export type IPerPage = 15 | 30 | 50;
export type ITopicOptions = 'Programming' | 'Math' | 'Physics' | 'Biology';
export type ITopicParam = 'All' | ITopicOptions;

export type ISearchParams = {
  query: string;
  page: number;
  sortBy: ISortBy;
  perPage: IPerPage;
  topic: ITopicParam;
};

export const sortByOptions: ISortBy[] = ['Likes', 'Views', 'New'];
export const perPageOptions: IPerPage[] = [15, 30, 50];
export const topicOptions: ITopicParam[] = [
  'All',
  'Programming',
  'Math',
  'Physics',
  'Biology',
];

export const exploreQueryStore = atom({
  params: {
    query: '',
    page: 1,
    sortBy: 'Likes' as ISortBy,
    perPage: 30 as IPerPage,
    topic: 'All' as ITopicParam,
  },
} as {
  params: ISearchParams;
});

export function setExploreQueryFieldsWithoutSideEffects(
  params: Partial<ISearchParams>
) {
  let { params: paramsRef } = exploreQueryStore.get();
  paramsRef = {
    ...paramsRef,
    ...params,
  };
  exploreQueryStore.get().params = {
    ...paramsRef,
  };
}

export function triggerExploreFetch() {
  const { params: paramsRef } = exploreQueryStore.get();

  const newStore = exploreQueryStore.get();
  newStore.params = {
    ...paramsRef,
  };

  exploreQueryStore.set({
    ...newStore,
  });
}

export function setExploreQuery({ query }: Partial<ISearchParams>) {
  setExploreQueryFieldsWithoutSideEffects({ query });
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
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      sortBy,
    },
  });
}

export function setExploreQueryPerPage(perPage: IPerPage) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      perPage,
    },
  });
}

export function setExploreQueryTopic(topic: ITopicParam) {
  exploreQueryStore.set({
    params: {
      ...exploreQueryStore.get().params,
      topic,
    },
  });
}
