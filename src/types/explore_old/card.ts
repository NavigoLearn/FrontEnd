export type CardType = {
  name: string;
  author: string;
  authorId: string;
  description: string;
  likes: number;
  isLiked: boolean;
  id: string;
};

export type RoadmapTypeApi = {
  id: string;
  ownerId: string;
  name: string;
  likes: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  data: string;
};

export type CardTypeApiResponse = {
  type: 'roadmaps';
  userId: string;
  roadmaps: RoadmapTypeApiExplore[];
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

export type CardTypeApiResponseExplore = {
  success: boolean;
  pageCount: number;
  roadmaps: RoadmapTypeApiExplore[];
};

export type likeType = {
  success: boolean;
};
