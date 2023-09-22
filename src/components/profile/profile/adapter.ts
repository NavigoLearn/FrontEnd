import { type ICardRoadmapTypeApi } from '@src/types/explore/card';
import { type ProfileDataReponse } from './profile-data';

interface IProfileDataAdapter {
  adapt(data: any): ProfileDataReponse;
  adaptRoadmaps(data: any): ICardRoadmapTypeApi[];
}

export class DefaultProfileAdapter implements IProfileDataAdapter {
  adapt(data: any): ProfileDataReponse {
    return {
      message: data.message,
      success: data.success,
      data: {
        generalInfo: {
          followerCount: data.data.followerCount,
          followingCount: data.data.followingCount,
          githubLinked: data.data.githubLinked,
          googleLinked: data.data.googleLinked,
          createdAt: data.data.createdAt,
          isFollowing: data.data.isFollowing,
        },
        profileInfo: {
          id: data.data.id,
          avatar: data.data.avatar,
          quote: data.data.quote,
          name: data.data.name,
          githubUrl: data.data.githubUrl,
          websiteUrl: data.data.websiteUrl,
          bio: data.data.bio,
        },
        activityInfo: {
          roadmapsCount: data.data.roadmapsCount,
          roadmapsViews: data.data.roadmapsViews,
          roadmapsLikes: data.data.roadmapsLikes,
        },
      },
    };
  }

  adaptRoadmaps(data: any): ICardRoadmapTypeApi[] {
    return data.map((roadmap: any) => {
      return {
        id: roadmap.id,
        name: roadmap.name,
        description: roadmap.description,
        topic: roadmap.topic,
        isPublic: roadmap.isPublic,
        isDraft: roadmap.isDraft,
        createdAt: roadmap.createdAt,
        updatedAt: roadmap.updatedAt,
        userId: roadmap.userId,
        userAvatar: roadmap.userAvatar,
        userName: roadmap.userName,
        likeCount: roadmap.likeCount,
        viewCount: roadmap.viewCount,
        isLiked: roadmap.isLiked,
      };
    });
  }
}
