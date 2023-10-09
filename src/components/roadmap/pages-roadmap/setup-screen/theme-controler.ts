import { type IColorThemesOptions } from '@src/types/roadmap/node/colors-types';
import { getCurrentRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/roadmap-funtions';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/color-themes';

export const getColorThemeFromRoadmap = () => {
  return getCurrentRoadmap().data.colorTheme;
};

export const setRoadmapColorTheme = (colorTheme: IColorThemesOptions) => {
  getCurrentRoadmap().data.colorTheme = colorTheme;
};
