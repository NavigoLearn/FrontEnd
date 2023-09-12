export type IssueComment = {
  id: string;
  author: string;
  authorId: string;
  content: string;
  date: string;
  profilePictureUrl: string;
};

export interface IssueApi {
  roadmapId: string; // will be converted to bigint eventually
  open: boolean;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IssueApiGet {
  id: string;
  userId: string;
  roadmapId: string; // will be converted to bigint eventually
  open: boolean;
  title: string;
  content: string;
  createdAt: string;
}

export interface IssueCommentApiGet {
  id: string;
  userId: string;
  issueId: string;
  content: string;
  createdAt: string;
}
