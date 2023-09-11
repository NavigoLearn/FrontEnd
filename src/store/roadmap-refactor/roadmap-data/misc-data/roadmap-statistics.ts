import { atom } from 'nanostores';
import { IRoadmapApi } from '@type/explore_old/card';

export type IRoadmapStatistics = {
  loaded: boolean;
  likes: number;
  views: number;
  isLiked: -1 | 0 | 1;
};

const BOILERPLATE_ROADMAP_STATISTICS: IRoadmapStatistics = {
  loaded: false,
  likes: 0,
  views: 0,
  isLiked: 0,
};

const storeRoadmapStatistics = atom(
  BOILERPLATE_ROADMAP_STATISTICS as IRoadmapStatistics
);

export default storeRoadmapStatistics;

export function setRoadmapStatisticsLikes(newLikes: number) {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, likes: newLikes });
}

export function setRoadmapStatisticsDownvote() {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, likes: store.likes - 1 });
}

export function setRoadmapStatisticsVoteState(newVoteState: -1 | 0 | 1) {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, isLiked: newVoteState });
}

export function setRoadmapStatisticsUpvote() {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, likes: store.likes + 1 });
}

export function setRoadmapStatisticsLoaded(newLoaded: boolean) {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, loaded: newLoaded });
}

export function adapterRoadmapToStatistics(
  roadmap: IRoadmapApi
): IRoadmapStatistics {
  const { likeCount, viewCount, isLiked } = roadmap;

  console.log('likeCount', likeCount, isLiked, roadmap);
  const loaded = true;
  return {
    likes: parseInt(likeCount, 10),
    loaded,
    views: parseInt(viewCount, 10),
    isLiked,
  };
}

export function setRoadmapStatistics(statistics: IRoadmapStatistics) {
  storeRoadmapStatistics.set({ ...statistics });
}

export function getRoadmapLikes() {
  return storeRoadmapStatistics.get().likes;
}

export function getRoadmapViews() {
  return storeRoadmapStatistics.get().views;
}

export function getRoadmapIsLiked() {
  return storeRoadmapStatistics.get().isLiked;
}

export function setRoadmapStatisticsRemoveLike() {
  const voteState = storeRoadmapStatistics.get().isLiked;
  if (voteState === 1) {
    setRoadmapStatisticsLikes(getRoadmapLikes() - 1);
  }
  if (voteState === -1) {
    setRoadmapStatisticsLikes(getRoadmapLikes() + 1);
  }
  if (voteState === 0) {
    throw new Error('Cannot remove like if there is no like');
  }
}
