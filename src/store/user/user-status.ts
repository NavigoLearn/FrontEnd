import { atom } from 'nanostores';

const userStatusStore = atom({
  userId: '',
  isLogged: false,
  loaded: false,
} as {
  userId: string;
  isLogged: boolean;
  loaded: boolean;
});

export const setIsLogged = (isLogged: boolean) => {
  userStatusStore.set({ ...userStatusStore.get(), isLogged });
};

export const setUserId = (userId: string) => {
  userStatusStore.set({ ...userStatusStore.get(), userId });
};

export const setLoaded = (loaded: boolean) => {
  userStatusStore.set({ ...userStatusStore.get(), loaded });
};

export const getUserStatus = () => {
  return userStatusStore.get();
};
export default userStatusStore;
