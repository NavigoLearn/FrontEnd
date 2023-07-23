import { atom } from 'nanostores';
import { HashMap } from '@type/roadmap/stores/roadmap';

export const dataHolderAny = atom({
  data: {}, // store meant to be used with the HOC library as a temporary storage for any kind
  // of data
} as {
  data: HashMap<any>;
});
