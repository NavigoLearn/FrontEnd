import { type IVersions } from '@store/roadmap-refactor/roadmap-data/params/params-base-roadmap';
import { type IRoadmap } from '../roadmap/stores/IRoadmap';

export type CardType = {
  name: string;
  author: string;
  authorId: string;
  description: string;
  likes: number;
  isLiked: boolean;
  id: string;
};

export type IRoadmapApi = {
  id: string;
  userId: string;
  name: string;
  likeCount: string;
  viewCount: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  isLiked: -1 | 0 | 1;
  isDraft: boolean;
  data: string | IRoadmap;
  miscData: string;
  version: IVersions;
};

export type RoadmapTypeApiExplore = {
  id: string;
  name: string;
  description: string;
  likes: number;
  isLiked: boolean;
  ownerName: string;
  ownerId: string;
};

export type CardTypeApiResponse = {
  type: 'roadmaps';
  userId: string;
  roadmaps: RoadmapTypeApiExplore[];
};

export type CardTypeApiResponseExplore = {
  success: boolean;
  pageCount: number;
  roadmaps: RoadmapTypeApiExplore[];
};

export type likeType = {
  success: boolean;
};
