import { atom } from 'nanostores';
import {
  changeCachedTabInfoProp,
  createTabsToServer,
  getCachedTabInfo,
  updateTabsToServer,
} from '@store/roadmap/cache/cached-tabs';
import { HashMap } from '@type/roadmap/old/roadmap';
import { TabAbout, TabInfo, TabIssue } from '@type/roadmap/old/tab-manager';
import { createTabInfoData } from '../../../api-wrapper/roadmap/tab-data';

const diffTabsStore = atom({
  // this is a store keeping track of the changes made to the pages while elements-editing
  // the roadmapDiff is made when the userDisplay transfers
  info: {},
  about: {},
  issues: {},
  newTabs: [],
  changedTabs: [],
} as {
  info: HashMap<TabInfo>;
  about: TabAbout;
  issues: HashMap<TabIssue>;
  newTabs: string[];
  changedTabs: string[];
});

export const diffTabInfoNew = (id: string, tab: TabInfo) => {
  const original = diffTabsStore.get();
  if (!original.newTabs.includes(id)) {
    original.newTabs.push(id);
  }
  diffTabsStore.set({ ...original, info: { ...original.info, [id]: tab } });
};

export const createNewTabs = async () => {
  // iterates over all keys in the diffTabsStore and creates new pages
  const original = diffTabsStore.get();
  // waits for all promises to resolve
  await Promise.all(
    original.newTabs.map(async (id) => {
      const tab = original.info[id];
      return createTabInfoData(tab.id, tab);
    })
  );
};

export const diffTabInfoProp = <T extends keyof TabInfo>(
  id: string,
  prop: T,
  value: TabInfo[T]
) => {
  const original = diffTabsStore.get();
  if (!original.info[id]) {
    original.info[id] = {} as TabInfo;
  }
  if (!original.changedTabs.includes(id)) {
    original.changedTabs.push(id);
  }

  diffTabsStore.set({
    ...original,
    info: { ...original.info, [id]: { ...original.info[id], [prop]: value } },
  });
};

export const applyDiffInfoToTab = (tab: TabInfo) => {
  // applies the diffs to the tab-attachment and returns the new tab-attachment
  const original = diffTabsStore.get();
  const diff = original.info[tab.id];
  let diffTab = tab;
  if (diff) {
    diffTab = { ...tab, ...diff };
  }
  return diffTab;
};

export const applyDiffIssueToTab = (tab: TabIssue) => {
  // applies the diffs to the tab-attachment and returns the new tab-attachment
  const original = diffTabsStore.get();
  const diff = original.issues[tab.id];
  let diffTab = tab;
  if (diff) {
    diffTab = { ...tab, ...diff };
  }
  return diffTab;
};

export const diffSaveTabInfo = (id: string, tab: TabInfo) => {
  // compares the tab-attachment keys to the cached version and saves the diff
  const cachedTab = getCachedTabInfo(id);
  Object.keys(tab).forEach((key: keyof TabInfo) => {
    if (cachedTab[key] !== tab[key]) {
      diffTabInfoProp(id, key, tab[key]);
    }
  });
};

export const emptyAllDiffs = () => {
  diffTabsStore.set({
    info: {},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    about: {},
    issues: {},
    newTabs: [],
    changedTabs: [],
  });
};
export const applyAllDiffs = () => {
  // applies all diffs to the cache and posts the changes to the server

  // apply the info diffs
  const original = diffTabsStore.get();
  const diffInfo = original.info;
  Object.keys(diffInfo).forEach((id) => {
    const diffTab = diffInfo[id];
    // apply diffs for each property
    Object.keys(diffTab).forEach((key: keyof TabInfo) => {
      // apply to cache and send to server
      changeCachedTabInfoProp(id, key, diffTab[key]);
    });
  });

  const { newTabs } = original;
  const { changedTabs } = original;
  updateTabsToServer(changedTabs);
  createTabsToServer(newTabs);
  // handle changed and new pages differences
  // currently the cache holds the new pages and changes pages
  emptyAllDiffs();
  return Object.keys(diffInfo);
};
export default diffTabsStore;
