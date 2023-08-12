export type IColorThemesFields = {
  primary: string;
  secondary: string;
  tertiary: string;
};

export type IColorThemes = {
  defaultTheme: IColorThemesFields;
  whiteTheme: IColorThemesFields;
  darkTheme: IColorThemesFields;
};

export type IColorThemesOptions = 'defaultTheme' | 'whiteTheme' | 'darkTheme';
export type IColorThemesColors = 'primary' | 'secondary' | 'tertiary';

const colorThemes: IColorThemes = {
  defaultTheme: {
    primary: 'blue',
    secondary: 'gray',
    tertiary: 'green',
  },
  whiteTheme: {
    primary: 'white',
    secondary: 'lightgray',
    tertiary: 'lightgreen',
  },
  darkTheme: {
    primary: 'black',
    secondary: 'darkgray',
    tertiary: 'darkgreen',
  },
};