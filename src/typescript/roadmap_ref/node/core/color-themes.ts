import { IColorThemes } from '@type/roadmap/node/colors-types';

export const colorThemes: IColorThemes = {
  defaultTheme: {
    primary: {
      nodeColor: '#ffffff',
      textColor: 'rgb(0,0,0,0.6)',
    },
    secondary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
    },
    tertiary: {
      nodeColor: '#3361D8',
      textColor: 'white',
    },
    Quaternary: {
      nodeColor: '#B4C6F4',
      textColor: '#1A1B50',
    },
  },
  whiteTheme: {
    primary: {
      nodeColor: '#3361D8',
      textColor: 'white',
    },
    secondary: {
      nodeColor: 'white',
      textColor: '#3361D8',
    },
    tertiary: {
      nodeColor: 'white',
      textColor: 'black',
    },
    Quaternary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
    },
  },
  darkTheme: {
    primary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
    },
    secondary: {
      nodeColor: 'white',
      textColor: 'black',
    },
    tertiary: {
      nodeColor: '#DBDFEF',
      textColor: '#1A1B50',
    },
    Quaternary: {
      nodeColor: '#3361D8',
      textColor: 'white',
    },
  },
};
