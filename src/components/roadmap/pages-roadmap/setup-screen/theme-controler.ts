import { IColorThemesOptions } from '@src/types/roadmap/node/colors-types';
import { getCurrentRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/roadmap-funtions';
import roadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

export const getColorThemeFromRoadmap = () => {
  return getCurrentRoadmap().data.colorTheme;
};

export const setRoadmapColorTheme = (colorTheme: IColorThemesOptions) => {
  getCurrentRoadmap().data.colorTheme = colorTheme;
};
