import { getCurrentRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/roadmap-funtions';

export const setTitleToRoadmap = (name: string) => {
  getCurrentRoadmap().data.roadmapName = name;
};

export const getTitleFromRoadmap = () => {
  return getCurrentRoadmap().data.roadmapName;
};
