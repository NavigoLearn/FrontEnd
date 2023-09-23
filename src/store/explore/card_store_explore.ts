import { atom } from 'nanostores';
import { type CardType } from '@type/explore_old/card';

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

export default cardsFromApi;
