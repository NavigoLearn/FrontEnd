import { IColorThemesOptions } from '@src/types/roadmap/node/colors-types';
import { currentRoadmap } from './roadmap-funtions';

export const getColorThemeFromRoadmap = () => {
  return currentRoadmap.data.colorTheme;
};

export const setColorThemeToRoadmap = (colorTheme: IColorThemesOptions) => {
  currentRoadmap.data.colorTheme = colorTheme;
};

export const setDefaultColorThemeToRoadmap = () => {
  currentRoadmap.data.colorTheme = 'defaultTheme';
};
