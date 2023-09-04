import { atom } from 'nanostores';

type IProfilePages = 'profile' | 'activity' | 'roadmaps';
export const profilePagesArray: IProfilePages[] = [
  'profile',
  'activity',
  'roadmaps',
];
export const storeProfilePages = atom({
  currentPage: 'profile',
} as {
  currentPage: IProfilePages;
});

export function setProfilePage(page: IProfilePages) {
  storeProfilePages.set({ currentPage: page });
}

export function getProfilePage() {
  return storeProfilePages.get().currentPage;
}
