import { type ISortBy } from '@components/explore/stores/explore-query-store';

export type ICardRoadmapTypeApi = {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly topic: ISortBy;
  readonly isPublic: boolean;
  readonly isDraft: 1 | 0;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // user
  readonly userId: number;
  readonly userAvatar: string | null;
  readonly userName: string;

  // stats
  readonly likeCount: number;
  readonly viewCount: number;

  // user stats
  readonly isLiked: number;
};

export type FullRoadmapTypeApi = {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly data: string;
  readonly topic: ISortBy;
  readonly isPublic: boolean;
  readonly isDraft: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // user
  readonly userId: number;
  readonly userAvatar: string | null;
  readonly userName: string;

  // stats
  readonly likeCount: number;
  readonly viewCount: number;

  // user stats
  readonly isLiked: number;
};

export type FullRoadmapTypeApiResponse = {
  success: boolean;
  message: string;
  data: FullRoadmapTypeApi[];
};

export type RoadmapTypeApiExplore = {
  success: boolean;
  message: string;
  data: ICardRoadmapTypeApi[];
  total: number;
};
