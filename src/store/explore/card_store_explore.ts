import { atom } from 'nanostores';
import { CardType } from '@type/explore_old/card';
import { errorHandlerDecorator } from '@src/typescript/error-handler';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';
import {
  fetchDefaultCardsExplore,
  fetchRoadmapCardsProfile,
} from '@src/api-wrapper/explore/roadmap-card-data';

const cardsFromApi = atom({
  cards: {},
  ids: [],
} as {
  cards: {
    [value: string]: CardType;
  };
  ids: string[];
});

/* eslint-disable import/prefer-default-export */

export function addCardIdToStore(id: string) {
  const original = cardsFromApi.get();
  original.ids.push(id);
  cardsFromApi.set({ ...original });
}

export function addCardToStore(id: string, card: CardType) {
  addCardIdToStore(id);
  const original = cardsFromApi.get();
  original.cards[id] = card;
  cardsFromApi.set({ ...original });
}

export function emptyStore() {
  const original = cardsFromApi.get();
  original.cards = {};
  original.ids = [];
  cardsFromApi.set({ ...original });
}

export const setRoadmapCardsFromApiExplore = errorHandlerDecorator(
  async (query: string, page: number) => {
    const exploreRoadmaps = await fetchDefaultCardsExplore(query, page);
    dispatchAnalyticsEvent('exploreInteractionQuery', {
      exploreActionType: 'Search',
      exploreData: {
        query,
      },
    });
    emptyStore();

    exploreRoadmaps.roadmaps.forEach((value) => {
      const newValueExplore: CardType = {
        name: value.name,
        author: value.ownerName,
        description: value.description,
        likes: value.likes,
        isLiked: value.isLiked,
        id: value.id,
        authorId: value.ownerId,
      };
      addCardToStore(value.id, newValueExplore);
    });
    return {
      pageCount: exploreRoadmaps.pageCount,
    };
  }
);

export async function setRoadmapCardsFromApiProfile(
  id: string,
  author: string
) {
  const idArray = await fetchRoadmapCardsProfile(id);
  idArray.forEach((value) => {
    const newValue: CardType = {
      name: value.name,
      author: value.ownerName,
      description: value.description,
      likes: value.likes,
      isLiked: value.isLiked,
      id: value.id,
      authorId: value.ownerId,
    };
    addCardToStore(value.id, newValue);
  });
}

export default cardsFromApi;
