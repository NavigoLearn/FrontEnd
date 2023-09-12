import { HashMap } from '@type/roadmap/old/roadmap';
import { TabAbout, TabInfo, TabIssue } from '@type/roadmap/old/tab-manager';

// the cache will keep the original value of the editor-pages, if the values are modified in elements-editing it will apply the diffs
export type cachedTabs = {
  info: HashMap<TabInfo>;
  about: TabAbout;
  issues: HashMap<TabIssue>;
};
