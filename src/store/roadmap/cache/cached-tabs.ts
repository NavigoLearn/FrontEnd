import { atom } from 'nanostores';
import { cachedTabs } from '@type/roadmap/old/cache';
import { TabAbout, TabInfo, TabIssue } from '@type/roadmap/old/tab-manager';
import {
  createTabInfoData,
  updateTabInfoData,
} from '../../../api-wrapper/roadmap/tab-data';

const cachedTabs = atom({
  info: {},
  about: {},
  issues: {},
} as cachedTabs);

export const cacheTabInfo = (id: string, tab: TabInfo) => {
  const original = cachedTabs.get();
  console.log('cached tab-attachment', tab);
  cachedTabs.set({ ...original, info: { ...original.info, [id]: tab } });
};

export const cacheTabAbout = (tab: TabAbout) => {
  const original = cachedTabs.get();
  cachedTabs.set({ ...original, about: tab });
};

export const cacheTabAboutProp = <T extends keyof TabAbout>(
  tab: TabAbout,
  prop: T,
  value: TabAbout[T]
) => {
  const original = cachedTabs.get();
  cachedTabs.set({ ...original, about: { ...original.about, [prop]: value } });
};

export const cacheTabIssues = (id: string, tab: TabIssue) => {
  const original = cachedTabs.get();
  cachedTabs.set({ ...original, issues: { ...original.issues, [id]: tab } });
};

export const getCachedTabInfo = (id: string) => {
  const original = cachedTabs.get();
  return original.info[id];
};

export const getCachedTabIssue = (id: string) => {
  const original = cachedTabs.get();
  return original.issues[id];
};

export const checkCachedTabInfo = (id: string) => {
  const original = cachedTabs.get();
  return original.info[id];
};

export const checkCachedTabAbout = () => {
  const original = cachedTabs.get();
  return original.about;
};

export const checkCachedTabIssues = (id: string) => {
  const original = cachedTabs.get();
  return original.issues[id];
};

export const changeCachedTab = (id: string, tab: TabInfo) => {
  const original = cachedTabs.get();
  cachedTabs.set({ ...original, [id]: tab });
};

export const changeCachedTabAboutProp = <T extends keyof TabAbout>(
  prop: T,
  value: TabAbout[T]
) => {
  const original = cachedTabs.get();
  cachedTabs.set({ ...original, about: { ...original.about, [prop]: value } });
};

export const changeCachedTabIssueProp = <T extends keyof TabIssue>(
  id: string,
  prop: T,
  value: TabIssue[T]
) => {
  const original = cachedTabs.get();
  cachedTabs.set({
    ...original,
    issues: {
      ...original.issues,
      [id]: { ...original.issues[id], [prop]: value },
    },
  });
};

export const changeCachedTabIssue = (id: string, tab: TabIssue) => {
  const original = cachedTabs.get();
  cachedTabs.set({ ...original, issues: { ...original.issues, [id]: tab } });
};

export const changeCachedTabInfoProp = <T extends keyof TabInfo>(
  id: string,
  prop: T,
  value: TabInfo[T]
) => {
  const original = cachedTabs.get();
  cachedTabs.set({
    ...original,
    info: { ...original.info, [id]: { ...original.info[id], [prop]: value } },
  });
};

export const updateTabsToServer = async (idArray: string[]) => {
  // iterates over all keys in the diffTabsStore and creates new pages
  console.log('before all posts', idArray);
  const original = cachedTabs.get();
  // waits for all promises to resolve
  await Promise.all(
    idArray.map(async (id) => {
      const tab = original.info[id];
      return updateTabInfoData(tab.id, tab);
    })
  );
  console.log('after all posts updated');
};

export const createTabsToServer = async (idArray: string[]) => {
  // iterates over all keys in the diffTabsStore and creates new pages
  console.log('before all posts', idArray);
  const original = cachedTabs.get();
  // waits for all promises to resolve
  await Promise.all(
    idArray.map(async (id) => {
      const tab = original.info[id];
      return createTabInfoData(tab.id, tab);
    })
  );
  console.log('after all posts created');
};

export default cachedTabs;
