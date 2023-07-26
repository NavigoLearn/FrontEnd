// config file for the HOC library
import { dataHolderAny } from '@store/misc/data-holder-any';

export const config = {
  storeType: 'nanostores',
  defaultStore: dataHolderAny,
  fallbackStore: dataHolderAny,
  automaticField: false,
  automaticStore: false,
} as {
  storeType: 'nanostores';
  defaultStore: any;
  fallbackStore: any;
  automaticField: boolean;
  automaticStore: boolean;
};
