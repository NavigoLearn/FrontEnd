import { atom } from 'nanostores';

const storeVisitorStatus = atom({
  userId: '',
  isLogged: false,
  loaded: false,
} as {
  userId: string;
  isLogged: boolean;
  loaded: boolean;
});

export const setIsLogged = (isLogged: boolean) => {
  storeVisitorStatus.set({ ...storeVisitorStatus.get(), isLogged });
};

export const setVisitorId = (userId: string) => {
  storeVisitorStatus.set({ ...storeVisitorStatus.get(), userId });
};

export const setLoaded = (loaded: boolean) => {
  storeVisitorStatus.set({ ...storeVisitorStatus.get(), loaded });
};

export const getUserStatus = () => {
  return storeVisitorStatus.get();
};
export default storeVisitorStatus;
