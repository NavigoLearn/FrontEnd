import { IColorThemes } from '@type/roadmap/node/colors-types';

export const colorThemes: IColorThemes = {
  defaultTheme: {
    primary: {
      nodeColor: '#ffffff',
      textColor: 'rgb(0,0,0,0.6)',
      borderColor: 'F0F0F0',
    },
    secondary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
      borderColor: 'none',
    },
    tertiary: {
      nodeColor: '#3361D8',
      textColor: 'white',
      borderColor: 'none',
    },
    Quaternary: {
      nodeColor: '#B4C6F4',
      textColor: '#1A1B50',
      borderColor: 'none',
    },
  },
  whiteTheme: {
    primary: {
      nodeColor: '#3361D8',
      textColor: 'white',
      borderColor: 'none',
    },
    secondary: {
      nodeColor: 'white',
      textColor: '#3361D8',
      borderColor: '#3361D8',
    },
    tertiary: {
      nodeColor: 'white',
      textColor: '#1A1B50',
      borderColor: 'black',
    },
    Quaternary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
      borderColor: 'none',
    },
  },
  darkTheme: {
    primary: {
      nodeColor: '#1A1B50',
      textColor: 'white',
      borderColor: 'none',
    },
    secondary: {
      nodeColor: 'white',
      textColor: 'black',
      borderColor: '#pnF0F0F0',
    },
    tertiary: {
      nodeColor: '#DBDFEF',
      textColor: '#1A1B50',
      borderColor: 'none',
    },
    Quaternary: {
      nodeColor: '#3361D8',
      textColor: 'white',
      borderColor: 'none',
    },
  },
};
