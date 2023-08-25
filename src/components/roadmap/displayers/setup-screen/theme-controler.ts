import { IColorThemesOptions } from '@src/types/roadmap/node/colors-types';
import { getCurrentRoadmap } from '@components/roadmap/displayers/setup-screen/roadmap-funtions';

export const getColorThemeFromRoadmap = () => {
  return getCurrentRoadmap().data.colorTheme;
};

export const setColorThemeToRoadmap = (colorTheme: IColorThemesOptions) => {
  getCurrentRoadmap().data.colorTheme = colorTheme;
};

export const setDefaultColorThemeToRoadmap = () => {
  getCurrentRoadmap().data.colorTheme = 'defaultTheme';
};
