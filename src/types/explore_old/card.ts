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
  isDraft: boolean;
  data: string;
  miscData: string;
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
