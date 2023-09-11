import { atom } from 'nanostores';
import { IRoadmapApi } from '@type/explore_old/card';

export type IRoadmapStatistics = {
  loaded: boolean;
  likes: number;
  views: number;
};

const BOILERPLATE_ROADMAP_STATISTICS: IRoadmapStatistics = {
  loaded: false,
  likes: 0,
  views: 0,
};

const storeRoadmapStatistics = atom(
  BOILERPLATE_ROADMAP_STATISTICS as IRoadmapStatistics
);

export default storeRoadmapStatistics;

export function setRoadmapStatisticsLikes(newLikes: number) {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, likes: newLikes });
}

export function setRoadmapStatisticsLoaded(newLoaded: boolean) {
  const store = storeRoadmapStatistics.get();
  storeRoadmapStatistics.set({ ...store, loaded: newLoaded });
}

export function adapterRoadmapToStatistics(
  roadmap: IRoadmapApi
): IRoadmapStatistics {
  const { likeCount, viewCount } = roadmap;

  const loaded = true;
  return {
    likes: parseInt(likeCount, 10),
    loaded,
    views: parseInt(viewCount, 10),
  };
}

export function setRoadmapStatistics(statistics: IRoadmapStatistics) {
  storeRoadmapStatistics.set({ ...statistics });
  console.log('setRoadmapStatistics', statistics);
}
