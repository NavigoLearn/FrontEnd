import { IColorThemes } from '@type/roadmap/node/colors-types';

export const colorThemes: IColorThemes = {
  defaultTheme: {
    primary: {
      nodeColor: 'white',
      textColor: '#00000099',
    },
    secondary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
    },
    tertiary: {
      nodeColor: '#3361D8',
      textColor: 'white',
    },
  },
  whiteTheme: {
    primary: {
      nodeColor: 'white',
      textColor: '#8f6363',
    },
    secondary: {
      nodeColor: '#8f6363',
      textColor: 'white',
    },
    tertiary: {
      nodeColor: '#b43d3d',
      textColor: 'white',
    },
  },
  darkTheme: {
    primary: {
      nodeColor: 'black',
      textColor: 'white',
    },
    secondary: {
      nodeColor: 'white',
      textColor: 'black',
    },
    tertiary: {
      nodeColor: 'grey',
      textColor: 'white',
    },
  },
};
