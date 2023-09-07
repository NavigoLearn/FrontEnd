import { ISortBy } from '@components/explore/stores/explore-query-store';

export type CardRoadmapTypeApi = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly topic: ISortBy;
  readonly isPublic: boolean;
  readonly isDraft: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // user
  readonly userId: string;
  readonly userAvatar: string | null;
  readonly userName: string;

  // stats
  readonly likeCount: string;
  readonly viewCount: string;

  // user stats
  readonly isLiked: string;
};

export type FullRoadmapTypeApi = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly data: string;
  readonly topic: ISortBy;
  readonly isPublic: boolean;
  readonly isDraft: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // user
  readonly userId: string;
  readonly userAvatar: string | null;
  readonly userName: string;

  // stats
  readonly likeCount: string;
  readonly viewCount: string;

  // user stats
  readonly isLiked: string;
};

export type FullRoadmapTypeApiResponse = {
  success: boolean;
  message: string;
  data: FullRoadmapTypeApi[];
};

export type RoadmapTypeApiExplore = {
  success: boolean;
  message: string;
  data: CardRoadmapTypeApi[];
  total: number;
};
