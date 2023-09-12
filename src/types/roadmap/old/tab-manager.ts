type Link = {
  title: string;
  link: string;
};

export type TabInfoApi = {
  stringId: string;
  roadmapId: string;
  content: string;
};

export type TabInfoApiSendFormat = {
  tabInfo: TabInfoApi;
};

export type TabInfo = {
  id: string;
  title: string;
  done: boolean;
  description: string;
  links: Link[];
  additionalInfo: string;
};

export type TabAbout = {
  name: string;
  author: string;
  description: string;
};

export type TabIssue = {
  id: string;
  title: string;
  author: string;
};

type TabManager = {
  info: TabInfo;
  about: TabAbout;
  issues: TabIssue;
};

export type TabKeys = keyof TabManager;

export type TabManagerStore = {
  type: string;
  open: boolean;
  about: TabAbout;
  info: TabInfo;
  issues: TabIssue;
};

export type IssuePreview = {
  id: string;
  author: string;
  authorId: string;
  profilePictureUrl: string;
  open: boolean;
  title: string;
  createdAt: string;
  description: string;
};
