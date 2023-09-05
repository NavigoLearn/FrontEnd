import { atom } from 'nanostores';

export const profileDataStore = atom({
  loaded: false,
  data: {},
} as {
  loaded: boolean;
  data: any;
});
