import { currentRoadmap } from './roadmap-funtions';

export const setTitleToRoadmap = (name: string) => {
  currentRoadmap.data.roadmapName = name;
};

export const getTitleFromRoadmap = () => {
  return currentRoadmap.data.roadmapName;
};
